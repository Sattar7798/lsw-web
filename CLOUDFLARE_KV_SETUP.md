# راهنمای تنظیم Cloudflare KV برای شمارنده

## مشکل
شمارنده کارت‌های پارس ID از حافظه موقت استفاده می‌کند که با هر restart صفر می‌شود.

## راه‌حل
باید از **Cloudflare KV** برای ذخیره‌سازی دائمی استفاده کنیم.

## مراحل تنظیم در Cloudflare Dashboard

### 1. ساخت KV Namespace
1. به [Cloudflare Dashboard](https://dash.cloudflare.com) بروید
2. از منو، **Workers & Pages** را انتخاب کنید
3. **KV** را از نوار کناری انتخاب کنید
4. روی **Create a namespace** کلیک کنید
5. نام namespace را `STATS_STORAGE` بگذارید
6. **Add** را کلیک کنید

### 2. اتصال KV به پروژه
1. به صفحه پروژه خود در **Workers & Pages** بروید
2. پروژه `lsw-web` را انتخاب کنید
3. به تب **Settings** بروید
4. **Functions** را از نوار کناری انتخاب کنید
5. به بخش **KV Namespace Bindings** بروید
6. روی **Add binding** کلیک کنید:
   - **Variable name**: `STATS_KV`
   - **KV namespace**: `STATS_STORAGE` (که در مرحله قبل ساختید)
7. **Save** را کلیک کنید

### 3. تنظیم wrangler.toml (اختیاری - فقط برای dev محلی)
اگر می‌خواهید در محیط local هم KV داشته باشید، این فایل را ایجاد کنید:

```toml
name = "lsw-web"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "STATS_KV"
id = "YOUR_KV_NAMESPACE_ID"  # از داشبورد کپی کنید
```

### 4. Deploy مجدد
بعد از تنظیم KV، کد جدید را push کنید:
```bash
git add .
git commit -m "Add Cloudflare KV for persistent stats counter"
git push
```

## تست
بعد از deploy:
1. چند کارت پارس ID صادر کنید
2. به صفحه `/iran-map` بروید
3. باید شمارنده را ببینید که بالا می‌رود
4. حتی بعد از رفرش یا چند ساعت بعد، عدد حفظ می‌شود

## نکات
- کد فعلی fallback به in-memory دارد برای محیط local
- در production، باید KV binding را حتماً تنظیم کنید
- اگر KV تنظیم نشود، counter در production هم کار نمی‌کند
