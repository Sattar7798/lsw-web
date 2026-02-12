# راهنمای Deploy روی Vercel

این راهنما شامل تمام مراحل deploy وبسایت شیر و خورشید روی Vercel است.

## پیش‌نیازها

- [x] پروژه Next.js آماده است
- [x] Git repository (GitHub, GitLab, or Bitbucket)
- [ ] حساب Vercel (رایگان: https://vercel.com/signup)

---

## مرحله 1: آماده‌سازی Repository

### 1. ایجاد .gitignore (اگر ندارید)

```bash
# فایل .gitignore
node_modules/
.next/
.env.local
.env*.local
out/
dist/
.DS_Store
*.log
```

### 2. Commit و Push

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

---

## مرحله 2: Deploy به Vercel

### روش 1: از طریق Dashboard (توصیه می‌شود)

1. به https://vercel.com بروید و login کنید
2. کلیک روی "Add New Project"
3. Import Git Repository:
   - انتخاب GitHub/GitLab
   - انتخاب repository خود: `lion-and-sun-web`
4. Configure Project:
   - **Framework Preset:** Next.js (خودکار تشخیص داده می‌شود)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build` (پیش‌فرض)
   - **Output Directory:** `.next` (پیش‌فرض)

5. Environment Variables:
   ```
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   TELEGRAM_CHAT_ID=your_telegram_chat_id
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
   ```

6. کلیک روی "Deploy"

### روش 2: از طریق Vercel CLI

```bash
# نصب Vercel CLI
npm i -g vercel

# Deploy
vercel

# تنظیم production
vercel --prod
```

---

## مرحله 3: تنظیمات Domain

### 1. استفاده از Subdomain رایگان Vercel

- URL پیش‌فرض: `your-project-name.vercel.app`
- نیاز به کار اضافه ندارد!

### 2. اضافه کردن Custom Domain

1. Dashboard > Project > Settings > Domains
2. Add Domain: `yourdomain.com`
3. به DNS Provider خود  بروید و:

**برای Root Domain (yourdomain.com):**
```
Type: A Record
Name: @
Value: 76.76.21.21
```

**برای WWW:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Wait for propagation (10-60 دقیقه)

---

## مرحله 4: استفاده از Features خاص

### 1. فعال‌سازی Analytics

1. Dashboard > Project > Analytics
2. Enable Analytics
3. مشاهده User Insights و Performance Metrics

### 2. تنظیم  Auto Deploy

✅ **پیش‌فرض فعال است!**
- هر Push به `main` → Auto Deploy
- Pull Requests → Preview Deployment

### 3. Configure Build Settings

در `next.config.js`:

```javascript
module.exports = {
    // ... existing config
    
    // برای production
    env: {
        CUSTOM_VAR: process.env.CUSTOM_VAR,
    },
    
    // Headers (قبلاً در middleware است)
    async headers() {
        return []
    },
}
```

---

## مرحله 5: بررسی و Testing

### 1. بررسی Production Build

```bash
# محلی
npm run build
npm start

# بررسی در http://localhost:3000
```

### 2. Lighthouse Audit

1. باز کردن site در Chrome
2. F12 > Lighthouse
3. Run audit برای Production URL
4. هدف:
   - Performance: > 90
   - Accessibility: > 90
   - Best Practices: > 90
   - SEO: > 90
   - PWA: > 90

### 3. Browser Testing

- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## مرحله 6: پیکربندی‌های پیش‌رفته

### 1. Custom Build Command (اختیاری)

```json
// package.json
{
  "scripts": {
    "build": "next build",
    "build:prod": "NODE_ENV=production next build"
  }
}
```

### 2. Edge Functions (اختیاری)

برای API Routes سریع‌تر:

```typescript
// app/api/example/route.ts
export const runtime = 'edge'
```

### 3. Caching Strategy

```javascript
// next.config.js
module.exports = {
    async headers() {
        return [
            {
                source: '/:all*(svg|jpg|png|webp|avif)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ]
    },
}
```

---

## Troubleshooting

### مشکل: Build Fails

```bash
# محلی تست کنید
npm run build

# بررسی Logs در Vercel Dashboard
```

### مشکل: Environment Variables کار نمی‌کنند

- مطمئن شوید `NEXT_PUBLIC_` prefix دارند (برای client-side)
- Redeploy کنید بعد از تغییر env vars

### مشکل: 404 Errors

- بررسی کنید routing درست است
- `app/` directory structure چک کنید

---

## Security Checklist

✅ HTTPS خودکار فعال است (توسط Vercel)
✅ Security Headers در middleware.ts تنظیم شده
✅ Environment variables محرمانه در Vercel Dashboard
✅ .env.local در .gitignore قرار دارد
✅ Rate limiting فعال است
✅ Input validation فعال است
✅ reCAPTCHA فعال است

---

## Production Ready!

پس از Deploy:
1. ✅ بررسی تمام صفحات
2. ✅ تست فرم contact
3. ✅ بررسی Dark Mode
4. ✅ تست PWA (Add to Home Screen)
5. ✅ بررسی Lighthouse Score
6. ✅ تست در موبایل

وبسایت شما حالا LIVE است! 🎉
