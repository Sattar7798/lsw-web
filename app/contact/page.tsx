'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const { executeRecaptcha } = useGoogleReCaptcha()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // Generate reCAPTCHA token
            if (!executeRecaptcha) {
                setError('reCAPTCHA not loaded')
                setLoading(false)
                return
            }

            const token = await executeRecaptcha('contact_form')

            const response = await fetch('/api/send-telegram', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    recaptchaToken: token,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setSubmitted(true)
                setFormData({ name: '', email: '', message: '' })
                setTimeout(() => setSubmitted(false), 5000)
            } else {
                setError(data.error || 'خطا در ارسال پیام')
            }
        } catch (err) {
            setError('خطا در ارتباط با سرور')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="relative min-h-screen">
            <section className="min-h-screen py-20 px-4 bg-gradient-to-br from-deep-emerald via-charcoal to-ruby-red relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-matte-gold rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-ruby-red rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
                            <span className="text-matte-gold">تماس</span>{' '}
                            <span className="text-marble-white">با ما</span>
                        </h1>
                        <p className="text-center text-marble-white/80 mb-12 text-lg">
                            برای هرگونه سوال، پیشنهاد یا همکاری با ما در تماس باشید
                        </p>

                        <div className="glass-gold rounded-3xl p-8 md:p-12">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-marble-white font-semibold mb-2">
                                        نام و نام خانوادگی
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-charcoal/50 border-2 border-matte-gold/30 rounded-lg text-marble-white focus:border-matte-gold outline-none transition-colors"
                                        placeholder="نام خود را وارد کنید"
                                    />
                                </div>

                                <div>
                                    <label className="block text-marble-white font-semibold mb-2">
                                        ایمیل <span className="text-matte-gold/60 text-sm">(اختیاری)</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-charcoal/50 border-2 border-matte-gold/30 rounded-lg text-marble-white focus:border-matte-gold outline-none transition-colors"
                                        placeholder="example@email.com"
                                        dir="ltr"
                                    />
                                </div>

                                <div>
                                    <label className="block text-marble-white font-semibold mb-2">
                                        پیام شما
                                    </label>
                                    <textarea
                                        required
                                        rows={6}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 bg-charcoal/50 border-2 border-matte-gold/30 rounded-lg text-marble-white focus:border-matte-gold outline-none transition-colors resize-none"
                                        placeholder="پیام خود را اینجا بنویسید..."
                                    />
                                </div>

                                {error && (
                                    <div className="bg-ruby-red/20 border border-ruby-red rounded-lg p-4 text-center">
                                        <p className="text-ruby-red font-semibold">⚠️ {error}</p>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-matte-gold hover:bg-matte-gold/90 text-charcoal font-bold py-4 px-8 rounded-lg transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {loading ? '⏳ در حال ارسال...' : submitted ? '✓ پیام با موفقیت ارسال شد!' : 'ارسال پیام'}
                                </button>
                            </form>

                            {/* Contact Info */}
                            <div className="mt-12 pt-8 border-t border-matte-gold/20">
                                <h3 className="text-xl font-bold text-matte-gold mb-8 text-center font-nastaliq">
                                    شبکه‌های اجتماعی
                                </h3>
                                <div className="flex justify-center items-center gap-8">
                                    {/* Telegram */}
                                    <a
                                        href="https://t.me/SamanthaIrani2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(96,165,250,0.3)]"
                                    >
                                        <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 blur-xl"></div>
                                        <svg className="w-8 h-8 text-gray-400 group-hover:text-blue-400 transition-colors relative z-10" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.5 1-4.24 2.89-.4.27-.76.4-1.08.39-.35-.01-1.03-.2-1.54-.37-.62-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .24z" />
                                        </svg>
                                    </a>

                                    {/* X (Twitter) */}
                                    <a
                                        href="https://x.com/samanthairani?s=21"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                                    >
                                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 blur-xl"></div>
                                        <svg className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors relative z-10" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                    </a>

                                    {/* Instagram */}
                                    <a
                                        href="https://www.instagram.com/thepersiancrown?igsh=czIwYTBlOWpieDg1&utm_source=qr"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 opacity-0 group-hover:opacity-30 rounded-2xl transition-opacity duration-300 blur-xl"></div>
                                        <svg className="w-8 h-8 text-gray-400 group-hover:text-pink-400 transition-colors relative z-10" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
