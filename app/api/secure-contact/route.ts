import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const { encryptedMessage, encryptedAttachments } = await request.json();

        if (!encryptedMessage) {
            return NextResponse.json({ error: 'No encrypted message provided' }, { status: 400 });
        }

        // EDGE COMPATIBILITY NOTE:
        // Nodemailer does not work in Edge Runtime (Cloudflare Pages).
        // To send real emails, we would need to use an HTTP-based service like Resend, SendGrid, or MailChannels.
        // For now, we are logging the request to the console (Mock Mode) to allow deployment to succeed.

        console.log('--- Secure Message Received (Edge) ---');
        console.log('Encrypted Payload Length:', encryptedMessage.length);
        console.log('Attachments:', encryptedAttachments ? encryptedAttachments.length : 0);
        console.log('To enable real emails, integration with an Edge-compatible email provider is required.');
        console.log('--------------------------------------');

        return NextResponse.json({ message: 'Secure message received (Edge Mock Mode)' }, { status: 200 });

    } catch (error) {
        console.error('Secure API Error:', error);
        return NextResponse.json({ error: 'Failed to process secure request' }, { status: 500 });
    }
}
