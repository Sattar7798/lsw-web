'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function LeaderSection() {
    const [isPlaying, setIsPlaying] = useState(false)

    const handlePlayAudio = () => {
        // Placeholder for audio playback
        setIsPlaying(!isPlaying)
        // In production: implement actual audio player
        console.log('Voice message playback toggled')
    }

    return (
        <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
            {/* Background - Subtle Sun Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-matte-gold rounded-full blur-3xl animate-pulse-gold"></div>
            </div>

            <div className="container-custom relative z-10">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Right Side - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="order-1 md:order-2"
                    >
                        <div className="relative">
                            {/* Decorative Frame */}
                            <div className="absolute -inset-4 bg-gradient-gold opacity-20 blur-xl rounded-3xl"></div>

                            {/* Image Container */}
                            <div className="relative glass-gold rounded-3xl overflow-hidden p-2">
                                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
                                    <Image
                                        src="/leader.jpg"
                                        alt="رهبر اپوزیسیون"
                                        fill
                                        className="object-cover"
                                        style={{
                                            filter: 'contrast(1.1) brightness(1.05)',
                                        }}
                                    />
                                    {/* Rembrandt Lighting Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-charcoal/60"></div>
                                </div>
                            </div>

                            {/* Decorative Corner Elements */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 border-t-4 border-r-4 border-matte-gold opacity-50 rounded-tr-3xl"></div>
                            <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-4 border-l-4 border-matte-gold opacity-50 rounded-bl-3xl"></div>
                        </div>
                    </motion.div>

                    {/* Left Side - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="order-2 md:order-1 space-y-8"
                    >
                        {/* Title */}
                        <div>
                            <h2 className="text-5xl md:text-6xl font-bold mb-4">
                                <span className="text-gradient-gold">رهبر</span>
                                <br />
                                <span className="text-marble-white">اپوزیسیون</span>
                            </h2>
                            <div className="w-24 h-1 bg-gradient-gold rounded-full"></div>
                        </div>

                        {/* Description */}
                        <div className="space-y-4 text-lg md:text-xl leading-relaxed text-marble-white/90">
                            <p>
                                رهبری که با ظرافت زنانه و اقتدار سیاسی، برای آینده‌ای روشن‌تر برای ایران می‌کوشد.
                            </p>
                            <p>
                                با تعهد به تمامیت ارضی و برافراشتن پرچم شیر و خورشید، پیام امید و تحول را به تمام ایرانیان می‌رساند.
                            </p>
                        </div>

                        {/* Vision - Voice Message */}
                        <div className="glass-gold rounded-2xl p-6">
                            <h3 className="text-2xl font-bold text-matte-gold mb-4 flex items-center gap-2">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                                </svg>
                                دیدگاه رهبر
                            </h3>

                            {/* Audio Player UI */}
                            <div className="space-y-4">
                                <button
                                    onClick={handlePlayAudio}
                                    className="flex items-center gap-4 w-full group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-matte-gold flex items-center justify-center transition-smooth group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-matte-gold/50">
                                        {isPlaying ? (
                                            <svg className="w-6 h-6 text-charcoal" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                            </svg>
                                        ) : (
                                            <svg className="w-6 h-6 text-charcoal" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        )}
                                    </div>

                                    {/* Waveform Animation */}
                                    <div className="flex items-center gap-1 flex-1">
                                        {[...Array(20)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="w-1 bg-matte-gold rounded-full"
                                                animate={{
                                                    height: isPlaying ? [20, 40, 20] : 20,
                                                }}
                                                transition={{
                                                    duration: 0.8,
                                                    delay: i * 0.05,
                                                    repeat: isPlaying ? Infinity : 0,
                                                    ease: 'easeInOut',
                                                }}
                                                style={{
                                                    height: '20px',
                                                }}
                                            />
                                        ))}
                                    </div>
                                </button>

                                <p className="text-sm text-marble-white/70 text-center italic">
                                    «ما برای ایرانی آزاد، مستقل و متحد می‌کوشیم...»
                                </p>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <button className="btn-primary">
                                درباره رهبر
                            </button>
                            <button className="btn-outline">
                                تماس با ما
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
