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
                subject="پیام امنیتی جدید"
                content={
                    <div style={{ direction: 'rtl', fontFamily: 'Tahoma, Arial' }}>
                        <p style={{ fontSize: '16px' }}>درود،</p>
                        <p>یک پیام رمزنگاری شده جدید از طریق <strong>سامانه تماس امن</strong> دریافت شد.</p>

                        <div style={{ background: '#F3F4F6', padding: '20px', borderRadius: '8px', margin: '20px 0', border: '1px solid #E5E7EB' }}>
                            <p style={{ margin: '0 0 10px', color: '#4B5563', fontSize: '12px' }}>متن رمزنگاری شده (برای بازگشایی از کلید خصوصی استفاده کنید):</p>
                            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontFamily: 'Courier New, monospace', fontSize: '11px', direction: 'ltr', color: '#374151' }}>
                                {encryptedMessage}
                            </pre>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1E3A8A' }}>
                            <span>📎 پیوست‌ها:</span>
                            <strong>{encryptedAttachments ? encryptedAttachments.length : 0} فایل</strong>
                        </div>
                    </div>
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
