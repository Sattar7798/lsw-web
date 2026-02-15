import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/EmailTemplate';
import { render } from '@react-email/render';
import { redis } from '@/lib/redis';

export const runtime = 'edge';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { email } = await request.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'hedayatsattar@gmail.com';

    // Store subscriber in Redis
    await redis.sadd('subscribers', email);

    const emailContent = await render(
      <EmailTemplate
        subject="عضویت جدید در خبرنامه"
        content={
          <div style={{ direction: 'rtl', fontFamily: 'Tahoma, Arial' }}>
            <p style={{ fontSize: '16px', marginBottom: '10px' }}>درود بر شما،</p>
            <p>یک میهن‌پرست دیگر به جمع یاران <strong>شیر و خورشید</strong> پیوست.</p>
            <div style={{ backgroundColor: '#EFF6FF', padding: '15px', borderRadius: '8px', borderRight: '4px solid #1E3A8A', margin: '20px 0' }}>
              <span style={{ color: '#6B7280' }}>ایمیل کاربر:</span>
              <strong style={{ display: 'block', direction: 'ltr', textAlign: 'right', color: '#1E3A8A', marginTop: '5px' }}>{email}</strong>
            </div>
            <p>به امید آزادی و پیروزی نور بر تاریکی.</p>
          </div>
        }
      />
    );

    const { data, error } = await resend.emails.send({
      from: 'Lion & Sun <onboarding@resend.dev>',
      to: adminEmail,
      subject: 'New Newsletter Subscriber',
      html: emailContent
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: error.message || 'Email delivery failed' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Subscription successful', id: data?.id }, { status: 200 });

  } catch (error) {
    console.error('Newsletter API Critical Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
