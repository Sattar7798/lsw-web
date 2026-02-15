import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { redis } from '@/lib/redis';
import { EmailTemplate } from '@/components/EmailTemplate';
import { render } from '@react-email/render';
import React from 'react';

export const runtime = 'edge';

export async function POST(request: Request) {
    // Simple security check (replace with real auth in production)
    const { secret, subject, content, previewText } = await request.json();

    if (secret !== process.env.ADMIN_SECRET_KEY) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        // 1. Get all subscribers from Redis
        const subscribers = await redis.smembers('subscribers');

        if (!subscribers || subscribers.length === 0) {
            return NextResponse.json({ message: 'No subscribers found' }, { status: 200 });
        }

        // 2. Render the email content
        // 2. Render the email content
        const emailHtml = await render(
            <EmailTemplate
                subject={subject}
                content={
                    <div style={{ direction: 'rtl', fontFamily: 'Tahoma, Arial', lineHeight: '1.6' }}>
                        {content}
                    </div>
                }
            />
        );

        // 3. Send emails in batches (Resend supports max 50 TOs, or better Bcc/individual)
        // For simplicity/privacy, we send individually or use Bcc if list is small. 
        // Best practice: Loop and send individual to avoid exposing emails.
        // For specific limitations of Resend free tier, let's just send to the first 50 or loop.
        // Let's loop for now to be safe.

        // Note: In a real mass mailing, you'd use a Queue (like QStash) to handle thousands of emails.
        // Here we assume a small list (<100) for the start.

        const results = await Promise.allSettled(
            subscribers.map(email =>
                resend.emails.send({
                    from: 'Lion & Sun <news@resend.dev>', // Update this with your verified domain later
                    to: email,
                    subject: subject,
                    html: emailHtml
                })
            )
        );

        const successCount = results.filter(r => r.status === 'fulfilled').length;

        return NextResponse.json({
            message: 'Broadcast complete',
            stats: {
                total: subscribers.length,
                sent: successCount
            }
        }, { status: 200 });

    } catch (error) {
        console.error('Broadcast Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
