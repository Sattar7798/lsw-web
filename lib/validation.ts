import validator from 'validator'
import xss from 'xss'

/**
 * تأیید و پاک‌سازی ورودی‌های فرم تماس
 */

export interface ContactFormData {
    name: string
    email: string
    message: string
}

export interface ValidationResult {
    isValid: boolean
    errors: { [key: string]: string }
    sanitizedData?: ContactFormData
}

export function validateAndSanitizeContactForm(data: any): ValidationResult {
    const errors: { [key: string]: string } = {}

    // بررسی وجود فیلدها
    if (!data.name || !data.email || !data.message) {
        return {
            isValid: false,
            errors: { general: 'تمام فیلدها الزامی هستند' },
        }
    }

    // تأیید و پاک‌سازی نام
    let name = String(data.name).trim()
    if (name.length < 2 || name.length > 100) {
        errors.name = 'نام باید بین 2 تا 100 کاراکتر باشد'
    }
    // حذف تگ‌های HTML
    name = xss(name, {
        whiteList: {}, // هیچ تگی مجاز نیست
        stripIgnoreTag: true,
    })

    // تأیید و پاک‌سازی ایمیل
    let email = String(data.email).trim().toLowerCase()
    if (!validator.isEmail(email)) {
        errors.email = 'ایمیل نامعتبر است'
    }
    if (email.length > 254) {
        errors.email = 'ایمیل خیلی طولانی است'
    }
    // Normalize email
    email = validator.normalizeEmail(email) || email

    // تأیید و پاک‌سازی پیام
    let message = String(data.message).trim()
    if (message.length < 10 || message.length > 2000) {
        errors.message = 'پیام باید بین 10 تا 2000 کاراکتر باشد'
    }
    // حذف تگ‌های HTML خطرناک (اما سطرشکن‌ها را حفظ کن)
    message = xss(message, {
        whiteList: {}, // هیچ تگی مجاز نیست
        stripIgnoreTag: true,
    })

    // بررسی الگوهای مشکوک (SQL injection, script injection)
    const dangerousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+\s*=/i, // onclick=, onerror=, etc.
        /eval\(/i,
        /expression\(/i,
    ]

    const allText = `${name} ${email} ${message}`
    for (const pattern of dangerousPatterns) {
        if (pattern.test(allText)) {
            errors.general = 'ورودی شامل محتوای غیرمجاز است'
            break
        }
    }

    // اگر خطا وجود دارد
    if (Object.keys(errors).length > 0) {
        return {
            isValid: false,
            errors,
        }
    }

    // داده‌های پاک‌سازی شده
    return {
        isValid: true,
        errors: {},
        sanitizedData: {
            name,
            email,
            message,
        },
    }
}

/**
 * Escape کردن متن برای استفاده ایمن در Telegram message
 */
export function escapeForTelegram(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
}
