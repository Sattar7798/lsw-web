# استراتژی Backup و Protection

این راهنما شامل استراتژی‌های backup، domain protection، و monitoring است.

---

## فاز 1: Backup Strategy

### 1. کد (Code Backup)

✅ **Git Repository** (اصلی‌ترین backup)
- GitHub/GitLab با private repository
- Multiple branches برای safety
- Tag releases: `git tag v1.0.0`

**توصیه:**
```bash
# Clone دوم در local
git clone https://github.com/yourusername/lion-sun-web.git backup-repo

# یا Export کل repo
git bundle create lion-sun-backup.bundle --all
```

### 2. Database Backup (اگر داشته باشید)

در حال حاضر نیازی نیست - فرم فقط به Telegram می‌فرستد.

اگر در آینده database اضافه کردید:
- Automatic daily backups
- Download manual backups هفتگی
- Store offsite (Google Drive, Dropbox)

### 3. Assets Backup

**فایل‌های مهم:**
- `/public/logo.jpg`
- `/public/fonts/*`
- `/public/iran-2.svg`
- تصاویر و ویدیوها

**روش Backup:**
1. کپی کل `public/` folder
2. آپلود به Cloud Storage:
   - Google Drive
   - Dropbox
   - OneDrive

3. Scheduled backup (ماهانه):
```bash
# Windows
xcopy "public" "C:\Backups\lion-sun-public\" /E /I /Y

# یا zip کنید
```

### 4. Environment Variables

**مهم! این‌ها را backup کنید:**

```env
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=...
RECAPTCHA_SECRET_KEY=...
```

**ذخیره امن:**
1. در فایل encrypted
2. در Password Manager (1Password, Bitwarden)
3. در کاغذ (offline backup)

---

## فاز 2: Domain Protection

### 1. Domain Registration Security

**Enable این features در Domain Registrar:**

✅ **Two-Factor Authentication (2FA)**
- حتماً فعال کنید!

✅ **Domain Lock (Registry Lock)**
- جلوگیری از transfer غیرمجاز
- Enable در Domain Panel

✅ **WHOIS Privacy Protection**
- مخفی کردن اطلاعات شخصی
- معمولاً رایگان است

✅ **Auto-Renew**
- Domain expire نشود!
- Enable و تنظیم کارت معتبر

### 2. DNS Security

**Cloudflare (توصیه می‌شود)**

مزایا:
- DDoS Protection رایگان
- SSL/TLS
- Page Rules
- Analytics

**نحوه استفاده:**
1. ثبت‌نام در Cloudflare
2. اضافه کردن domain
3. تغییر Nameservers in Domain Registrar
4. تنظیم DNS Records
5. Enable "Proxied" (☁️ نارنجی)

### 3. Email Protection

**Prevent Domain Email Hijacking:**

SPF Record:
```
Type: TXT
Name: @
Value: v=spf1 -all
```

DMARC Record:
```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=reject; rua=mailto:your@email.com
```

---

## فاز 3: Uptime Monitoring

### 1. UptimeRobot (رایگان!)

**ثبت‌نام:**
https://uptimerobot.com

**تنظیم Monitor:**
1. Add New Monitor
2. Monitor Type: HTTPS
3. URL: `https://yourdomain.com`
4. Monitoring Interval: 5 دقیقه
5. Alert Contacts: ایمیل یا Telegram

### 2. Better Uptime (جایگزین)

https://betteruptime.com
- 10 monitors رایگان
- Status page
- Incident management

### 3. Cloudflare Analytics

Dashboard > Analytics:
- Visits
- Requests
- Bandwidth
- Threats blocked

---

## فاز 4: Security Monitoring

### 1. Vercel Security

**Automatic:**
✅ HTTPS
✅ DDoS Protection
✅ Firewall

**در Dashboard:**
- عبیWarnings بررسی کنید
- Security logs مرور کنید

### 2. Google Search Console

**ثبت‌نام:**
https://search.google.com/search-console

**تنظیم:**
1. Add Property: `https://yourdomain.com`
2. Verify ownership (از طریق Vercel DNS یا HTML file)
3. Monitor:
   - Security Issues
   - Mobile Usability
   - Core Web Vitals

### 3. GitHub Security

**Enable:**
- Dependabot alerts
- Code scanning
- Secret scanning

**در Repository Settings > Security:**
1. Enable Dependabot alerts
2. Review security advisories
3. Auto-update dependencies

### 4. Custom Monitoring

**Log Critical Events:**

```typescript
// lib/logger.ts
export function logSecurityEvent(event: string, details: any) {
    console.log('[SECURITY]', event, details)
    
    // در آینده: ارسال به monitoring service
    // مثل Sentry, LogRocket, etc.
}

// در API routes:
import { logSecurityEvent } from '@/lib/logger'

// Rate limited request
logSecurityEvent('RATE_LIMITED', { ip, endpoint })

// Failed reCAPTCHA
logSecurityEvent('RECAPTCHA_FAILED', { score, action })
```

---

## Disaster Recovery Plan

### سناریو 1: وبسایت Down است

1. بررسی Vercel Status: https://www.vercelstatus.com
2. بررسی Logs در Vercel Dashboard
3. بررسی Domain DNS
4. Fallback: Deploy از backup repo

### سناریو 2: Domain Hijack

1. تماس فوری با Domain Registrar
2. استفاده از Domain Lock recovery
3. بررسی Email برای unauthorized changes
4. تغییر passwords

### سناریو 3: Data Loss

1. استفاده از Git History: `git reflog`
2. Restore از backup
3. Vercel Deployment Rollback

---

## Checklist تکمیل

### Immediate (الان)
- [x] Code در Git push شده
- [x] Environment variables documented
- [ ] Public assets backed up

### Before Launch
- [ ] Domain registered با 2FA
- [ ] Domain Lock enabled
- [ ] Auto-renew enabled
- [ ] Cloudflare configured
- [ ] Uptime monitoring active

### Post-Launch
- [ ] Google Search Console verified
- [ ] Weekly backup schedule
- [ ] Monthly security review

---

**تمام این‌ها برای محافظت از وبسایت شیر و خورشید ضروری هستند!** 🔒
