# راهنمای تنظیم ارسال ایمیل (SMTP)

برای اینکه ایمیل‌ها واقعاً ارسال شوند، باید تنظیمات یک سرویس دهنده ایمیل را وارد کنید. ساده‌ترین روش استفاده از **Gmail** است.

## مراحل دریافت رمز عبور (App Password) از گوگل:

1.  به اکانت گوگل خود بروید: [Google Account Settings](https://myaccount.google.com/)
2.  به بخش **Security** بروید.
3.  گزینه **2-Step Verification** (تایید دو مرحله‌ای) را فعال کنید (اگر فعال نیست).
4.  در همان بخش Security، جستجو کنید: **App passwords**.
5.  یک نام انتخاب کنید (مثلاً `LionWeb`) و دکمه **Create** را بزنید.
6.  یک رمز ۱۶ رقمی به شما می‌دهد. آن را کپی کنید.

## تنظیم در فایل `.env.local`:

فایل `.env.local` را باز کنید و مقادیر زیر را جایگزین کنید:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=youremail@gmail.com  <-- ایمیل خودتان
SMTP_PASS=xxxx xxxx xxxx xxxx  <-- آن رمز ۱۶ رقمی
SMTP_FROM="Lion & Sun Secretariat" <youremail@gmail.com>
```

پس از ذخیره فایل، سرور را یکبار با `Control + C` متوقف و دوباره `npm run dev` کنید.
