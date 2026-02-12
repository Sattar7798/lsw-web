# راهنمای راه‌اندازی Telegram Bot برای فرم تماس

## مرحله 1: ساخت Bot

1. در تلگرام به [@BotFather](https://t.me/BotFather) پیام بدهید
2. دستور `/newbot` را بفرستید
3. نام Bot را وارد کنید (مثلاً: Lion and Sun Contact Bot)
4. Username Bot را وارد کنید (باید به `bot` ختم شود، مثلاً: `lionandsun_contact_bot`)
5. **Bot Token** را ذخیره کنید (مثل: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

## مرحله 2: دریافت Chat ID

برای دریافت Chat ID حساب خودتان:

### روش 1: استفاده از @userinfobot
1. به [@userinfobot](https://t.me/userinfobot) پیام بدهید
2. ربات Chat ID شما را می‌فرستد

### روش 2: استفاده از API
1. به Bot خودتان پیام بدهید (مثلاً: `/start`)
2. در مرورگر به این آدرس بروید و `YOUR_BOT_TOKEN` را با توکن Bot جایگزین کنید:
   ```
   https://api.telegram.org/botYOUR_BOT_TOKEN/getUpdates
   ```
3. در پاسخ JSON، به دنبال `"chat":{"id":` بگردید
4. عدد کنار آن Chat ID شماست (مثلاً: `123456789`)

## مرحله 3: تنظیم متغیرهای محیطی

فایل `.env.local` را ویرایش کنید:

\`\`\`env
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=123456789
\`\`\`

## مرحله 4: Restart کردن سرور

پس از تنظیم `.env.local`:
1. سرور Next.js را متوقف کنید (Ctrl+C)
2. دوباره سرور را اجرا کنید: `npm run dev`

## تست

1. به صفحه تماس بروید: http://localhost:3000/contact
2. فرم را پر کنید و ارسال کنید
3. پیام باید در تلگرام دریافت شود!

## نکات

- اگر Bot Token یا Chat ID اشتباه باشد، پیام ارسال نمی‌شود
- اطمینان حاصل کنید که حداقل یک بار به Bot پیام داده‌اید (مثلاً `/start`)
- فایل `.env.local` به Git اضافه نشود (در `.gitignore` قرار دارد)
