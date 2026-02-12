import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'edge';

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { email } = await request.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'hedayatsattar@gmail.com';

    const { data, error } = await resend.emails.send({
      from: 'Lion & Sun <onboarding@resend.dev>',
      to: adminEmail,
      subject: 'New Newsletter Subscriber',
      html: `<p>New subscriber joined: <strong>${email}</strong></p>`
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
