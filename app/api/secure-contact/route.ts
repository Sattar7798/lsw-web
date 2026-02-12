import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { encryptedMessage, encryptedAttachments } = await request.json();

        if (!encryptedMessage) {
            return NextResponse.json({ error: 'No encrypted message provided' }, { status: 400 });
        }

        // Check if SMTP credentials are provided
        const hasSmtp = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

        if (!hasSmtp) {
            console.log('--- Mock Secure Email Sending ---');
            console.log('Encrypted Payload:', encryptedMessage.substring(0, 50) + '...');
            console.log('---------------------------------');
            return NextResponse.json({ message: 'Secure message received (Mock Mode)' }, { status: 200 });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Send email with encrypted content
        await transporter.sendMail({
            from: `"Lion & Sun Secure" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER, // Send to self/admin
            subject: '🔐 پیام امن جدید (PGP Encrypted)',
            text: `
        یک پیام امن جدید دریافت شد.
        
        این پیام در مرورگر کاربر با کلید عمومی شما رمزنگاری شده است.
        برای مشاهده محتوا، متن بلوک PGP زیر را کپی کرده و با کلید خصوصی خود رمزگشایی کنید.

        ----------- BEGIN PGP MESSAGE -----------
        ${encryptedMessage}
        ----------- END PGP MESSAGE -----------

        ${encryptedAttachments ? `\n\nپیوسـت‌های رمزنگاری شده: ${encryptedAttachments.length} عدد` : ''}
      `,
        });

        return NextResponse.json({ message: 'Secure message sent successfully' }, { status: 200 });

    } catch (error) {
        console.error('Secure API Error:', error);
        return NextResponse.json({ error: 'Failed to process secure request' }, { status: 500 });
    }
}
