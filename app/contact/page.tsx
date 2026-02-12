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
                                        ایمیل
                                    </label>
                                    <input
                                        type="email"
                                        required
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
                                <h3 className="text-2xl font-bold text-matte-gold mb-6 text-center">
                                    راه‌های ارتباطی
                                </h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <a
                                        href="https://t.me/SamanthaIrani2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-center p-4 bg-charcoal/30 rounded-lg hover:bg-charcoal/50 transition-all hover:scale-105"
                                    >
                                        <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-marble-white/10 p-1">
                                            <Image src="/telegramlogo.png" alt="Telegram" width={64} height={64} className="w-full h-full object-cover rounded-full" />
                                        </div>
                                        <p className="text-matte-gold font-semibold mb-1">تلگرام</p>
                                        <p className="text-marble-white/80 text-sm">
                                            @SamanthaIrani2
                                        </p>
                                    </a>
                                    <a
                                        href="https://x.com/samanthairani?s=21"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-center p-4 bg-charcoal/30 rounded-lg hover:bg-charcoal/50 transition-all hover:scale-105"
                                    >
                                        <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-marble-white/10 p-1">
                                            <Image src="/xlogo.jpg" alt="X/Twitter" width={64} height={64} className="w-full h-full object-cover rounded-full" />
                                        </div>
                                        <p className="text-matte-gold font-semibold mb-1">توییتر</p>
                                        <p className="text-marble-white/80 text-sm">
                                            @samanthairani
                                        </p>
                                    </a>
                                    <a
                                        href="https://www.instagram.com/thepersiancrown?igsh=czIwYTBlOWpieDg1&utm_source=qr"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-center p-4 bg-charcoal/30 rounded-lg hover:bg-charcoal/50 transition-all hover:scale-105"
                                    >
                                        <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden bg-marble-white/10 p-1">
                                            <Image src="/instalogo.jpg" alt="Instagram" width={64} height={64} className="w-full h-full object-cover rounded-full" />
                                        </div>
                                        <p className="text-matte-gold font-semibold mb-1">اینستاگرام</p>
                                        <p className="text-marble-white/80 text-sm">
                                            @thepersiancrown
                                        </p>
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
