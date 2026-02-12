import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/EmailTemplate';
import { render } from '@react-email/render';

export const runtime = 'edge';

export async function POST(request: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const { encryptedMessage, encryptedAttachments } = await request.json();

        if (!encryptedMessage) {
            return NextResponse.json({ error: 'No encrypted message provided' }, { status: 400 });
        }

        const adminEmail = process.env.ADMIN_EMAIL || 'hedayatsattar@gmail.com';

        const emailContent = await render(
            <EmailTemplate 
            subject="New Encrypted Message"
            content = {
                <>
            <p><strong>To Decrypt: </strong> Use your Private Key.</p >
        <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '5px', margin: '20px 0' }}>
            <pre style={ { whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontFamily: 'monospace', fontSize: '12px' } }> { encryptedMessage } </pre>
                </div>
                < p > <strong>Attachments: </strong> {encryptedAttachments ? encryptedAttachments.length : 0}</p >
                    </>
}
          />
        );

const { data, error } = await resend.emails.send({
    from: 'Lion & Sun Secure <onboarding@resend.dev>',
    to: adminEmail,
    subject: 'New Encrypted Message',
    html: emailContent
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
