import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge';

// Simple edge-compatible rate limiter using generic store or just skip for now on Edge
// (Complex In-memory rate limiting doesn't work well on serverless/edge across regions without KV)

export async function POST(request: NextRequest) {
    try {
        const { name, email, message, recaptchaToken } = await request.json()

        // Validate and sanitize input (Basic check since 'validator' lib might be heavy/node-specific)
        // For Edge, we keep it simple or use lightweight regex
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        // Telegram Bot Configuration
        const botToken = process.env.TELEGRAM_BOT_TOKEN
        const chatId = process.env.TELEGRAM_CHAT_ID

        if (!botToken || !chatId) {
            return NextResponse.json(
                { error: 'Telegram configuration missing' },
                { status: 500 }
            )
        }

        const telegramMessage = `
🔔 پیام جدید از وبسایت شیر و خورشید

👤 نام: ${name}
📧 ایمیل: ${email}

💬 پیام:
${message}
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
