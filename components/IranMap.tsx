'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import InteractiveIranMap from './InteractiveIranMap'

interface Province {
    name: string
    info: string
    population: string
}

const provinces: Province[] = [
    { name: 'تهران', info: 'پایتخت ایران با تاریخی غنی', population: '۱۳ میلیون نفر' },
    { name: 'اصفهان', info: 'نصف جهان - شهر تاریخی و فرهنگی', population: '۵ میلیون نفر' },
    { name: 'آذربایجان شرقی', info: 'تبریز - دروازه تجارت ایران', population: '۴ میلیون نفر' },
    { name: 'خراسان رضوی', info: 'مشهد - قلب معنوی ایران', population: '۶ میلیون نفر' },
    { name: 'فارس', info: 'شیراز - زادگاه حافظ و سعدی', population: '۵ میلیون نفر' },
    { name: 'خوزستان', info: 'اهواز - قلب صنعتی ایران', population: '۵ میلیون نفر' },
]

export default function IranMap() {
    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <section className="relative min-h-screen flex items-center py-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute w-full h-full"
                    style={{
                        backgroundImage: 'radial-gradient(circle, var(--matte-gold) 1px, transparent 1px)',
                        backgroundSize: '50px 50px',
                    }}
                ></div>
            </div>

            <div className="container-custom relative z-10">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="text-marble-white">ایران</span>
                        <br />
                        <span className="text-gradient-gold">یکپارچه و متحد</span>
                    </h2>
                    <p className="text-xl text-marble-white/80 max-w-2xl mx-auto">
                        تمامیت ارضی ایران خط قرمز ماست
                    </p>
                    <div className="w-32 h-1 bg-gradient-gold rounded-full mx-auto mt-6"></div>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Map Visualization */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="glass-gold rounded-3xl p-8">
                            {/* Interactive Iran Map */}
                            <div className="relative w-full aspect-square">
                                <InteractiveIranMap />
                            </div>
                        </div>
                    </motion.div>

                    {/* Province Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {selectedProvince ? (
                            <motion.div
                                key={selectedProvince.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass rounded-2xl p-8 space-y-4"
                            >
                                <h3 className="text-3xl font-bold text-gradient-gold">
                                    {selectedProvince.name}
                                </h3>
                                <div className="w-16 h-1 bg-matte-gold rounded-full"></div>
                                <p className="text-xl text-marble-white/90">
                                    {selectedProvince.info}
                                </p>
                                <div className="flex items-center gap-2 text-matte-gold">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                    <span className="text-lg">{selectedProvince.population}</span>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="glass rounded-2xl p-8 text-center">
                                <svg
                                    className="w-16 h-16 text-matte-gold/50 mx-auto mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <p className="text-xl text-marble-white/70">
                                    روی نقاط روی نقشه کلیک کنید
                                </p>
                            </div>
                        )}

                        {/* Call to Action */}
                        <div className="glass-gold rounded-2xl p-6">
                            <h4 className="text-2xl font-bold text-matte-gold mb-3">
                                تمامیت ارضی ایران
                            </h4>
                            <p className="text-marble-white/90 leading-relaxed">
                                از آذربایجان تا خوزستان، از خراسان تا فارس - همه‌ی ایران متعلق به همه‌ی ایرانیان است.
                                ما برای حفظ یکپارچگی این سرزمین می‌ایستیم.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
