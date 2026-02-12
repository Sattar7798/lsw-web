import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Configure the transporter
    // For now, we'll try to use environment variables, but if not set, we can't send real email.
    // However, for the purpose of the demo, we should allow it to succeed if we are just logging it,
    // or if the user provides credentials.

    // Check if SMTP credentials are provided
    const hasSmtp = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

    if (!hasSmtp) {
      console.log('--- Mock Email Sending ---');
      console.log(`To: ${email}`);
      console.log('Subject: Welcome to the Resistance');
      console.log('Body: [Standard Welcome Email Template]');
      console.log('--------------------------');

      // Return success even if mocked, so the frontend behaves correctly
      return NextResponse.json({ message: 'Subscription successful (Mock Mode)' }, { status: 200 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verification
    await transporter.verify();

    // Send email
    await transporter.sendMail({
      from: `"Lion & Sun Secretariat" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: 'خوش‌آمدید: به مقاومت بپیوندید',
      html: `
        <div style="font-family: Tahoma, Arial, sans-serif; direction: rtl; text-align: right; background-color: #f4f4f4; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            
            <!-- Header with Logo -->
            <div style="background-color: #1c1917; padding: 20px; text-align: center;">
             <img src="cid:logo" alt="Lion & Sun Logo" style="width: 120px; height: 120px; border-radius: 50%; border: 3px solid #d4af37; object-fit: cover;">
              <h1 style="color: #d4af37; margin: 15px 0 0; font-size: 24px;">اپوزیسیون شیر و خورشید</h1>
            </div>

            <!-- Content -->
            <div style="padding: 30px; color: #333333; line-height: 1.6;">
              <h2 style="color: #1c1917; margin-bottom: 20px;">درود بر شما، هموطن گرامی</h2>
              <p>از اینکه به فهرست ما پیوستید سپاسگزاریم.</p>
              <p>شما اکنون در مسیر آگاهی و آزادی همراه ما هستید. اخبار مهم، بیانیه‌ها و فراخوان‌ها از طریق این ایمیل به اطلاع شما خواهد رسید.</p>
              
              <div style="background-color: #fffbeb; border-right: 4px solid #d4af37; padding: 15px; margin: 20px 0;">
                <p style="margin: 0; color: #b45309;"><strong>توجه:</strong> این ارتباط کاملاً امن است. ما از حریم خصوصی شما محافظت می‌کنیم.</p>
              </div>

              <p>برای ایران آزاد،<br>دبیرخانه شورای مرکزی</p>
            </div>

            <!-- Footer -->
            <div style="background-color: #eeeeee; padding: 15px; text-align: center; font-size: 12px; color: #666666;">
              <p>&copy; ${new Date().getFullYear()} Lion & Sun Opposition. All rights reserved.</p>
              <p><a href="#" style="color: #666666; text-decoration: underline;">لغو عضویت</a></p>
            </div>
            
          </div>
        </div>
      `,
      attachments: [
        {
          filename: 'logo.jpg',
          path: process.cwd() + '/public/logo.jpg',
          cid: 'logo' // same cid value as in the html img src
        }
      ]
    });

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });

  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
