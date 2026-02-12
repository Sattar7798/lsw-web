'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function VisionSection() {
    const [sliderValue, setSliderValue] = useState(0)

    // Calculate the blend between before (0) and after (100)
    const getFilterStyle = () => {
        const grayscale = 100 - sliderValue
        const brightness = 80 + (sliderValue * 0.4) // 80% to 120%
        const saturate = 50 + (sliderValue * 1.5) // 50% to 200%

        return {
            filter: `grayscale(${grayscale}%) brightness(${brightness}%) saturate(${saturate}%)`,
        }
    }

    return (
        <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-deep-emerald/20 to-charcoal"></div>

            <div className="container-custom relative z-10">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 title-nastaliq">
                        <span className="text-marble-white">ایران</span>
                        {' '}
                        <span className="text-gradient-gold">فردا</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-marble-white/80 max-w-3xl mx-auto leading-relaxed">
                        آینده‌ای که برای آن می‌جنگیم - ایرانی آزاد، مرفه و سرافراز
                    </p>
                    <div className="w-32 h-1 bg-gradient-gold rounded-full mx-auto mt-6"></div>
                </motion.div>

                {/* Before/After Slider */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-5xl mx-auto"
                >
                    <div className="glass-gold rounded-3xl p-4 md:p-8">
                        {/* Video Container */}
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
                            {/* Full Video Background */}
                            <video
                                className="absolute inset-0 w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            >
                                <source src="/futureplan.MOV" type="video/mp4" />
                                <source src="/futureplan.MOV" type="video/quicktime" />
                            </video>

                            {/* Dark overlay for better text contrast */}
                            <div className="absolute inset-0 bg-gradient-to-br from-deep-emerald/30 via-transparent to-ruby-red/30"></div>
                        </div>
                    </div>
                </motion.div>

                {/* Vision Points */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="grid md:grid-cols-3 gap-6 mt-12"
                >
                    {[
                        { icon: '🏛️', title: 'دموکراسی', desc: 'حکومتی مردمی و پاسخگو' },
                        { icon: '📚', title: 'آموزش', desc: 'آموزش رایگان و با کیفیت برای همه' },
                        { icon: '🌱', title: 'رفاه', desc: 'اقتصادی پایدار و عادلانه' },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="glass rounded-2xl p-6 text-center hover:glass-gold transition-smooth"
                        >
                            <div className="text-5xl mb-3">{item.icon}</div>
                            <h3 className="text-2xl font-bold text-matte-gold mb-2">{item.title}</h3>
                            <p className="text-marble-white/80">{item.desc}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <div className="glass-gold rounded-2xl p-8 max-w-3xl mx-auto">
                        <p className="text-2xl md:text-3xl text-marble-white leading-relaxed title-nastaliq mb-6">
                            «این آینده در دسترس است - فقط به اراده ما نیاز دارد»
                        </p>
                        <Link href="/secure">
                            <button className="btn-primary text-lg px-12 py-4">
                                به ما بپیوندید
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-deep-emerald/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-matte-gold/10 rounded-full blur-3xl"></div>
        </section>
    )
}
