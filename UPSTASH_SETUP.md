# راهنمای تنظیم Upstash Redis برای شمارنده

## چرا Upstash به جای Cloudflare KV؟
Cloudflare KV در Next.js on Pages به درستی کار نمی‌کند. Upstash Redis یک سرویس مدیریت‌شده رایگان است که عالی با Edge Runtime کار می‌کند.

## مراحل تنظیم

### 1. ساخت حساب Upstash (رایگان)
1. به https://upstash.com برو
2. روی **Sign Up** کلیک کن
3. با GitHub یا Email ثبت‌نام کن

### 2. ساخت Redis Database
1. بعد از ورود، روی **Create Database** کلیک کن
2. تنظیمات:
   - **Name**: `lsw-stats` (یا هر اسم دلخواهی)
   - **Type**: `Regional`
   - **Region**: نزدیک‌ترین region به کاربرانت (مثلاً `eu-central-1` برای اروپا)
   - **TLS**: فعال بمونه
3. روی **Create** کلیک کن

### 3. گرفتن Credentials
بعد از ساخت database، در صفحه database می‌بینی:
- **UPSTASH_REDIS_REST_URL**: مثل `https://xxx.upstash.io`
- **UPSTASH_REDIS_REST_TOKEN**: یک توکن طولانی

این دو تا رو کپی کن!

### 4. اضافه کردن به Cloudflare Pages
1. به Cloudflare Dashboard برو
2. پروژه `lsw-web` → **Settings** → **Environment variables**
3. دو تا متغیر اضافه کن:
   - **Name**: `UPSTASH_REDIS_REST_URL`, **Value**: URL که کپی کردی
   - **Name**: `UPSTASH_REDIS_REST_TOKEN`, **Value**: توکن که کپی کردی
4. **برای Production و Preview** هر دو فعال باشند
5. **Save** کن

### 5. محلی (Local Development)
یک فایل `.env.local` بساز در root پروژه:
```env
UPSTASH_REDIS_REST_URL=https://your-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token-here
```

**نکته:** این فایل رو به `.gitignore` اضافه کن تا push نشه!

### 6. Deploy
بعد از تنظیم environment variables:
```bash
git add .
git commit -m "Add Upstash Redis for persistent stats counter"
git push
```

## تست
1. چند کارت پارس ID صادر کن
2. به `/iran-map` برو
3. شمارنده باید بالا بره
4. حتی بعد از چند ساعت یا deploy جدید، عدد حفظ می‌شود! ✅

## مزایای Upstash
- ✅ رایگان تا 10,000 command در روز
- ✅ واقعاً persistent - هیچوقت reset نمیشه
- ✅ سریع (< 1ms latency)
- ✅ با Edge Runtime کار می‌کنه
- ✅ نیازی به Cloudflare KV نیست
