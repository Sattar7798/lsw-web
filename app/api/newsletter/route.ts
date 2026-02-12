import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // EDGE COMPATIBILITY NOTE:
    // Nodemailer does not work in Edge Runtime (Cloudflare Pages).
    // To send real emails, we would need to use an HTTP-based service like Resend, SendGrid, or MailChannels.
    // For now, we are logging the request to the console (Mock Mode) to allow deployment to succeed.

    console.log('--- Newsletter Subscription (Edge) ---');
    console.log(`Email: ${email}`);
    console.log('To enable real emails, integration with an Edge-compatible email provider is required.');
    console.log('--------------------------------------');

    return NextResponse.json({ message: 'Subscription successful (Edge Mock Mode)' }, { status: 200 });

  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
