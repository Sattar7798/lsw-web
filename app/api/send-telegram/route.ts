import { NextRequest, NextResponse } from 'next/server'
import rateLimit from '@/lib/rate-limit'

// Rate limiter: 3 requests per 10 minutes
const limiter = rateLimit({
    interval: 10 * 60 * 1000, // 10 minutes
    uniqueTokenPerInterval: 500, // Max 500 unique IPs tracked
})

export async function POST(request: NextRequest) {
    try {
        // Get IP address for rate limiting
        const ip = request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            'unknown'

        // Check rate limit
        try {
            await limiter.check(3, ip) // 3 requests per interval
        } catch {
            return NextResponse.json(
                { error: 'شما بیش از حد مجاز درخواست ارسال کرده‌اید. لطفاً 10 دقیقه صبر کنید.' },
                { status: 429 }
            )
        }

        const { name, email, message, recaptchaToken } = await request.json()

        // Verify reCAPTCHA token
        if (recaptchaToken) {
            const secretKey = process.env.RECAPTCHA_SECRET_KEY

            if (secretKey) {
                try {
                    const verifyResponse = await fetch(
                        `https://www.google.com/recaptcha/api/siteverify`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: `secret=${secretKey}&response=${recaptchaToken}`,
                        }
                    )

                    const verifyData = await verifyResponse.json()

                    if (!verifyData.success || verifyData.score < 0.5) {
                        return NextResponse.json(
                            { error: 'تأیید reCAPTCHA ناموفق بود. لطفاً دوباره تلاش کنید.' },
                            { status: 400 }
                        )
                    }
                } catch (error) {
                    console.error('reCAPTCHA verification error:', error)
                    // Continue even if verification fails (fallback)
                }
            }
        }

        // Validate and sanitize input
        const { validateAndSanitizeContactForm, escapeForTelegram } = await import('@/lib/validation')
        const validationResult = validateAndSanitizeContactForm({ name, email, message })

        if (!validationResult.isValid) {
            const firstError = Object.values(validationResult.errors)[0]
            return NextResponse.json(
                { error: firstError },
                { status: 400 }
            )
        }

        const sanitizedData = validationResult.sanitizedData!

        // Telegram Bot Configuration
        const botToken = process.env.TELEGRAM_BOT_TOKEN
        const chatId = process.env.TELEGRAM_CHAT_ID

        if (!botToken || !chatId) {
            return NextResponse.json(
                { error: 'Telegram configuration missing' },
                { status: 500 }
            )
        }

        // Format message با داده‌های پاک‌سازی شده
        const telegramMessage = `
🔔 پیام جدید از وبسایت شیر و خورشید

👤 نام: ${escapeForTelegram(sanitizedData.name)}
📧 ایمیل: ${escapeForTelegram(sanitizedData.email)}

💬 پیام:
${escapeForTelegram(sanitizedData.message)}

⏰ زمان: ${new Date().toLocaleString('fa-IR', { timeZone: 'Asia/Tehran' })}
        `.trim()

        // Send to Telegram
        const telegramResponse = await fetch(
            `https://api.telegram.org/bot${botToken}/sendMessage`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: telegramMessage,
                    parse_mode: 'HTML',
                }),
            }
        )

        const telegramData = await telegramResponse.json()

        if (!telegramResponse.ok) {
            console.error('Telegram API error:', telegramData)
            return NextResponse.json(
                { error: 'Failed to send message to Telegram' },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { success: true, message: 'Message sent successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error sending telegram message:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
