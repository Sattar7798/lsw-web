import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';

export async function POST(request: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const { encryptedMessage, encryptedAttachments } = await request.json();

        if (!encryptedMessage) {
            return NextResponse.json({ error: 'No encrypted message provided' }, { status: 400 });
        }

        const adminEmail = process.env.ADMIN_EMAIL || 'hedayatsattar@gmail.com';

        const { data, error } = await resend.emails.send({
            from: 'Lion & Sun Secure <onboarding@resend.dev>',
            to: adminEmail,
            subject: 'New Encrypted Message',
            html: `
                <h3>New Encrypted Message Received</h3>
                <p><strong>To Decrypt:</strong> Use your Private Key.</p>
                <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
                    <pre style="white-space: pre-wrap; word-break: break-all; font-family: monospace; font-size: 12px;">${encryptedMessage}</pre>
                </div>
                <p><strong>Attachments:</strong> ${encryptedAttachments ? encryptedAttachments.length : 0}</p>
            `,
        });

        if (error) {
            console.error('Resend Secure API Error:', error);
            return NextResponse.json({ error: error.message || 'Secure message delivery failed' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Secure message received', id: data?.id }, { status: 200 });

    } catch (error) {
        console.error('Secure API Critical Error:', error);
        return NextResponse.json({ error: 'Failed to process secure request' }, { status: 500 });
    }
}
