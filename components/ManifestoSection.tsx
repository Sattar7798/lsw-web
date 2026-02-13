'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ManifestoSection() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    }

    return (
        <section className="relative py-32 bg-charcoal overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-charcoal to-transparent z-10"></div>

            {/* Golden Glows */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-matte-gold/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-ruby-red/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>

            <div className="container-custom relative z-20" ref={ref}>
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.div variants={itemVariants} className="mb-6 flex justify-center">
                        <div className="w-16 h-1 bg-gradient-gold rounded-full"></div>
                    </motion.div>

                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-5xl lg:text-6xl font-black mb-12 text-transparent bg-clip-text bg-gradient-to-r from-marble-white via-white to-marble-white drop-shadow-lg"
                    >
                        زمان <span className="text-matte-gold">تغییر</span> فرا رسیده است
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl leading-loose text-marble-white/80 font-light mb-12"
                    >
                        ما در نقطه‌ای از تاریخ ایستاده‌ایم که سکوت جایز نیست.
                        اپوزیسیون شیر و خورشید، نه یک حزب، بلکه یک{' '}
                        <span className="font-bold text-matte-gold">حرکت ملی</span>
                        {' '}برای بازپس‌گیری هویت، عزت و آزادی ایران است.
                        ما متعهد به ایجاد ساختاری دموکراتیک، سکولار و مبتنی بر حقوق بشر هستیم.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="grid md:grid-cols-3 gap-8 mt-20"
                    >
                        {[
                            { title: "اتحاد ملی", icon: "🤝", desc: "همبستگی تمام اقوام و اقشار ایرانی زیر یک پرچم" },
                            { title: "اصالت فرهنگی", icon: "🏛️", desc: "احیای فرهنگ و تمدن باشکوه ایران‌زمین" },
                            { title: "آینده‌ای روشن", icon: "🌅", desc: "توسعه، رفاه و آزادی برای نسل‌های آینده" }
                        ].map((item, i) => (
                            <div key={i} className="glass p-8 rounded-2xl border-t border-matte-gold/20 hover:border-matte-gold/50 transition-colors group">
                                <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110">{item.icon}</div>
                                <h3 className="text-xl font-bold text-matte-gold mb-3">{item.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
