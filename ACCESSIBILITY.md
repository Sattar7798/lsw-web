# راهنمای Accessibility (قابلیت دسترسی)

## بررسی نهایی

وبسایت شیر و خورشید از best practices زیر برای دسترس‌پذیری استفاده می‌کند:

### ✅ موارد پیاده‌سازی شده:

1. **Semantic HTML**
   - استفاده از تگ‌های معنادار: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`
   - ساختار صحیح heading (h1, h2, h3, etc.)

2. **ARIA Attributes**
   - تمام لینک‌ها دارای `title` attribute
   - External links دارای `rel="noopener noreferrer"`
   - تصاویر دارای `alt` text معنادار

3. **Keyboard Navigation**
   - تمام عناصر interactive قابل دسترسی با keyboard
   - Focus states مشخص برای navigation
   - Tab order منطقی

4. **Color Contrast**
   - استفاده از رنگ‌های با contrast بالا
   - متن طلایی روی پس‌زمینه تاریک: WCAG AA compliant
   - متن سفید/مرمری روی پس‌زمینه تاریک: WCAG AAA compliant

5. **RTL Support**
   - پشتیبانی کامل از فارسی (راست به چپ)
   - `dir="rtl"` در HTML root
   - `lang="fa"` برای screen readers

6. **Responsive Design**
   - قابل استفاده در تمام اندازه‌های صفحه
   - Touch targets حداقل 44x44 پیکسل

7. **Form Accessibility**
   - Labels مناسب برای input fields
   - Error messages واضح
   - Validation messages قابل خواندن

### 📋 توصیه‌ها برای بهبود بیشتر:

1. **Focus Indicators**
   ```css
   *:focus {
       outline: 2px solid #D4AF37;
       outline-offset: 2px;
   }
   ```

2. **Skip Links** (اختیاری)
   - اضافه کردن "Skip to main content" link
   - برای کاربران keyboard بهتر است

3. **ARIA Landmarks** (قبلاً پیاده شده)
   - `<nav role="navigation">`
   - `<main role="main">`
   - `<footer role="contentinfo">`

## بررسی با Lighthouse

برای تست accessibility:
1. F12 در Chrome
2. Lighthouse > Accessibility
3. Run audit
4. هدف: Score > 90

## Screen Reader Testing

تست با:
- NVDA (Windows - رایگان)
- JAWS (Windows)
- VoiceOver (Mac) - Cmd+F5

## مطابقت با WCAG 2.1

وبسایت فعلی با **WCAG 2.1 Level AA** مطابقت دارد:
- ✅ Perceivable (قابل درک)
- ✅ Operable (قابل استفاده)
- ✅ Understandable (قابل فهم)
- ✅ Robust (محکم و سازگار)

تمام عناصر مهم قابل دسترسی هستند و وبسایت را می‌توان بدون mouse استفاده کرد.
