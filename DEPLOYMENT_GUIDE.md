# راهنمای تنظیمات دیپلوی (Cloudflare Pages)

برای فعال شدن ایمیل و تلگرام روی نسخه آنلاین، باید مقادیر زیر را در تنظیمات پروژه در Cloudflare وارد کنید. بدون این مقادیر، کدها کار نمی‌کنند.

**مسیر تنظیمات در Cloudflare:**
1. به داشبورد Cloudflare Pages بروید.
2. پروژه خود را انتخاب کنید.
3. به تب **Settings** > **Environment Variables** بروید.
4. دکمه **Add variable** را بزنید و مقادیر زیر را اضافه کنید.

| نام متغیر (Variable Name) | مقدار (Value) | توضیحات |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | `re_YTPCEXej_9WBcQyXGb4vBKYhnxXLUukCi` | **باید بسازید:** در [Resend.com](https://resend.com) ثبت نام کنید و API Key بگیرید. |
| `TELEGRAM_BOT_TOKEN` | `8206647400:AAFqoX8vAOw3O1K0Ha0oWhjC6WNkZumYqxs` | همان توکن ربات که در فایل env.local دارید. |
| `TELEGRAM_CHAT_ID` | `7572385621` | آیدی عددی شما برای دریافت پیام‌ها. |
| `ADMIN_EMAIL` | `hedayatsattar@gmail.com` | ایمیلی که پیام‌های سایت به آن ارسال می‌شود. |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | `6Ld3GmksAAAAAAdXbvvdKNWbWIhHe_1Swb__EChz` | کلید عمومی گوگل کپچا. |
| `RECAPTCHA_SECRET_KEY` | `6Ld3GmksAAAAAB50vZv5q9CxlIUdNo9B1V1EgSXP` | کلید مخفی گوگل کپچا. |

---

### اقدام بعدی (مهم)
بعد از اضافه کردن این متغیرها، باید به تب **Deployments** بروید و آخرین دیپلوی را **Redeploy** (Retry) کنید تا تنظیمات جدید اعمال شوند.
