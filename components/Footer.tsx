'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Footer() {
    const currentYear = new Date().getFullYear()
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setStatus('loading')
        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })

            if (res.ok) {
                setStatus('success')
                setEmail('')
                setTimeout(() => setStatus('idle'), 3000)
            } else {
                setStatus('error')
            }
        } catch (error) {
            setStatus('error')
        }
    }

    return (
        <footer className="relative bg-charcoal border-t border-matte-gold/30 pt-20 pb-10 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-matte-gold to-transparent opacity-50"></div>

            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

                    {/* Brand Column (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="inline-block group">
                            <div className="flex items-center gap-4">
                                <div className="relative w-28 h-28 transition-all duration-300 hover:scale-105">
                                    <Image
                                        src="/logo.jpg"
                                        alt="شیر و خورشید"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="flex flex-col justify-center h-28">
                                    <h3 className="text-2xl font-nastaliq text-matte-gold">اپوزیسیون شیر و خورشید</h3>
                                    <span className="text-sm text-gray-400">فرزندان پرچم</span>
                                </div>
                            </div>
                        </Link>
                        <p className="text-gray-400 leading-loose text-sm text-justify pl-4">
                            ما متعهد به بازگرداندن شکوه، آزادی و دموکراسی به ایران هستیم.
                            این پلتفرم صدای رسای ملتی است که برای بازپس‌گیری حقوق بنیادین خود به پا خاسته است.
                        </p>
                        <div className="flex gap-4">
                            {/* Telegram */}
                            <a
                                href="https://t.me/SamanthaIrani2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(96,165,250,0.5)] hover:scale-110"
                            >
                                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-400 transition-colors z-10" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.5 1-4.24 2.89-.4.27-.76.4-1.08.39-.35-.01-1.03-.2-1.54-.37-.62-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z" />
                                </svg>
                            </a>

                            {/* X (Twitter) */}
                            <a
                                href="https://x.com/samanthairani?s=21"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-110"
                            >
                                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors z-10" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/thepersiancrown?igsh=czIwYTBlOWpieDg1&utm_source=qr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-300 hover:border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:scale-110"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                <svg className="w-6 h-6 text-gray-400 group-hover:text-pink-400 transition-colors z-10" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links (2 cols) */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="text-lg font-bold text-white border-b-2 border-matte-gold/50 inline-block pb-2">لینک‌های سریع</h4>
                        <ul className="space-y-3">
                            {[
                                { name: 'خانه', href: '/' },
                                { name: 'رهبر اپوزیسیون', href: '/leader' },
                                { name: 'چشم‌انداز ما', href: '/vision' },
                                { name: 'تایم‌لاین تاریخی', href: '/timeline' },
                                { name: 'تماس با ما', href: '/contact' }
                            ].map((item, i) => (
                                <li key={i}>
                                    <Link href={item.href} className="text-gray-400 hover:text-matte-gold transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-matte-gold opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal / Resources (2 cols) */}
                    <div className="lg:col-span-2 space-y-6">
                        <h4 className="text-lg font-bold text-white border-b-2 border-matte-gold/50 inline-block pb-2">منابع</h4>
                        <ul className="space-y-3">
                            {[
                                { name: 'اسناد رسمی', href: '/documents' },
                                { name: 'بیانیه‌ها', href: '/news' },
                                { name: 'عضویت', href: '/membership' },
                                { name: 'حریم خصوصی', href: '/legal/privacy' },
                                { name: 'قوانین و شرایط', href: '/legal/terms' },
                                { name: 'کوکی‌ها', href: '/legal/cookies' }
                            ].map((item, i) => (
                                <li key={i}>
                                    <Link href={item.href} className="text-gray-400 hover:text-matte-gold transition-colors block">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter (4 cols) */}
                    <div className="lg:col-span-4 space-y-6 bg-white/5 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                        <h4 className="text-xl font-bold text-matte-gold">عضویت در خبرنامه</h4>
                        <p className="text-sm text-gray-400">
                            برای دریافت آخرین اخبار و بیانیه‌ها، ایمیل خود را وارد کنید.
                        </p>
                        <form className="space-y-3" onSubmit={handleSubmit}>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="ایمیل شما..."
                                    disabled={status === 'loading' || status === 'success'}
                                    className="w-full bg-charcoal border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-matte-gold transition-colors placeholder:text-gray-600 focus:ring-1 focus:ring-matte-gold disabled:opacity-50"
                                />
                            </div>
                            <button
                                disabled={status === 'loading' || status === 'success'}
                                className={`w-full font-bold py-3 rounded-lg transition-all active:scale-[0.98] ${status === 'success'
                                    ? 'bg-green-600 text-white'
                                    : 'bg-gradient-to-r from-matte-gold to-amber-600 text-charcoal hover:shadow-lg hover:shadow-amber-500/20'
                                    }`}
                            >
                                {status === 'loading' ? 'در حال ارسال...' : status === 'success' ? '✓ عضویت انجام شد' : 'عضویت'}
                            </button>
                        </form>
                        <p className="text-xs text-gray-500 flex items-center gap-2">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            اطلاعات شما کاملاً محرمانه باقی می‌ماند.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} اپوزیسیون شیر و خورشید. تمامی حقوق محفوظ است.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-gray-500 text-base font-medium">طراحی شده برای آزادی</span>
                        <div className="relative w-16 h-16 opacity-80 transition-all duration-300 hover:scale-110 hover:opacity-100">
                            <Image src="/logo.jpg" alt="Logo" fill className="object-contain" />
                        </div>
                    </div>
                </div>
            </div>

        </footer >
    )
}
