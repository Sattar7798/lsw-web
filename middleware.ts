import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const response = NextResponse.next()

    // Content Security Policy (CSP)
    // محافظت در برابر XSS و injection attacks
    const cspHeader = `
        default-src 'self';
        script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.google.com https://www.gstatic.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        img-src 'self' data: https: blob:;
        font-src 'self' https://fonts.gstatic.com;
        connect-src 'self' https://api.telegram.org https://www.google.com https://www.gstatic.com;
        frame-src 'self' https://www.google.com;
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim()

    response.headers.set('Content-Security-Policy', cspHeader)

    // X-Frame-Options: محافظت در برابر clickjacking
    response.headers.set('X-Frame-Options', 'DENY')

    // X-Content-Type-Options: جلوگیری از MIME type sniffing
    response.headers.set('X-Content-Type-Options', 'nosniff')

    // Referrer-Policy: کنترل اطلاعات referrer
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

    // Permissions-Policy: محدود کردن دسترسی به APIهای مرورگر
    response.headers.set(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    )

    // X-DNS-Prefetch-Control: کنترل DNS prefetching
    response.headers.set('X-DNS-Prefetch-Control', 'on')

    // Strict-Transport-Security (HSTS): اجبار HTTPS
    // فقط در production فعال می‌شود
    if (process.env.NODE_ENV === 'production') {
        response.headers.set(
            'Strict-Transport-Security',
            'max-age=31536000; includeSubDomains; preload'
        )
    }

    return response
}

// مسیرهایی که middleware روی آنها اجرا می‌شود
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
}
