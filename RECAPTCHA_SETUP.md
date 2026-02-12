# راهنمای تنظیم Google reCAPTCHA v3

## مرحله 1: ثبت‌نام و دریافت کلیدها

1. به این لینک بروید: https://www.google.com/recaptcha/admin/create
2. وارد حساب Google خود شوید
3. فرم را پر کنید:
   - **Label**: نام وبسایت (مثلاً: Lion and Sun Website)
   - **reCAPTCHA type**: انتخاب **reCAPTCHA v3**
   - **Domains**: دامنه وبسایت خود را وارد کنید
     - برای تست محلی: `localhost`
     - برای production: `yourdomain.com`
   - **Accept the reCAPTCHA Terms of Service**: تیک بزنید
4. روی **Submit** کلیک کنید

## مرحله 2: کپی کلیدها

بعد از ثبت، دو کلید به شما داده می‌شود:
- **Site Key** (کلید عمومی) - با `6L` شروع می‌شود
- **Secret Key** (کلید خصوصی) - با `6L` شروع می‌شود

## مرحله 3: اضافه کردن به .env.local

فایل `.env.local` را باز کنید و کلیدها را جایگزین کنید:

\`\`\`env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=YOUR_SITE_KEY_HERE
RECAPTCHA_SECRET_KEY=YOUR_SECRET_KEY_HERE
\`\`\`

**مثال:**
\`\`\`env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6LdXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
RECAPTCHA_SECRET_KEY=6LdYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
\`\`\`

## مرحله 4: Restart سرور

بعد از اضافه کردن کلیدها:
1. سرور را متوقف کنید (Ctrl+C در ترمینال)
2. دوباره اجرا کنید: `npm run dev`

## تست

1. به صفحه تماس بروید: http://localhost:3000/contact
2. فرم را پر کنید و ارسال کنید
3. reCAPTCHA به صورت خودکار در پس‌زمینه کار می‌کند (نامرئی)
4. اگر همه چیز درست باشد، پیام به تلگرام ارسال می‌شود

## نکات مهم

- **Site Key** عمومی است و در کد frontend قرار می‌گیرد
- **Secret Key** خصوصی است و فقط در سرور استفاده می‌شود
- v3 کاملاً نامرئی است (بدون چالش یا تیک زدن)
- امتیاز (score) بین 0.0 تا 1.0 است:
  - 0.0-0.4: احتمالاً bot
  - 0.5-1.0: احتمالاً انسان
- ما threshold را روی 0.5 تنظیم کرده‌ایم

## عیب‌یابی

اگر reCAPTCHA کار نمی‌کند:
1. مطمئن شوید کلیدها صحیح هستند
2. سرور را restart کنید
3. Cache مرورگر را پاک کنید
4. مطمئن شوید domain در Google Console درست تنظیم شده
5. Console مرورگر را برای خطاها بررسی کنید (F12)
