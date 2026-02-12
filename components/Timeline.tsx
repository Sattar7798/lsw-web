'use client'

import { motion } from 'framer-motion'

interface TimelineEvent {
    year: string
    title: string
    description: string
}

const events: TimelineEvent[] = [
    {
        year: '۵۵۰ ق.م',
        title: 'کوروش کبیر',
        description: 'بنیانگذار امپراتوری هخامنشی و اولین استفاده از نماد شیر'
    },
    {
        year: '۲۲۴ م',
        title: 'دوران ساسانی',
        description: 'شیر و خورشید به عنوان نماد قدرت و عدالت'
    },
    {
        year: '۱۲۰۰ م',
        title: 'دوران صفوی',
        description: 'رسمیت یافتن شیر و خورشید در پرچم ایران'
    },
    {
        year: '۱۹۰۶',
        title: 'مشروطه',
        description: 'پرچم رسمی ایران با شیر و خورشید'
    },
    {
        year: '۱۹۲۵-۱۹۷۹',
        title: 'دوران پهلوی',
        description: 'استمرار استفاده از نماد شیر و خورشید'
    },
    {
        year: 'امروز',
        title: 'اپوزیسیون شیر و خورشید',
        description: 'احیای نماد برای آینده‌ای آزاد و دموکراتیک'
    },
]

export default function Timeline() {
    return (
        <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-matte-gold/30 to-transparent"></div>
            </div>

            <div className="container-custom relative z-10">
                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="text-marble-white">تاریخچه</span>
                        <br />
                        <span className="text-gradient-gold">شیر و خورشید</span>
                    </h2>
                    <p className="text-xl text-marble-white/80 max-w-2xl mx-auto">
                        از باستان تا امروز - نمادی از قدرت، عدالت و هویت ایرانی
                    </p>
                    <div className="w-32 h-1 bg-gradient-gold rounded-full mx-auto mt-6"></div>
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Horizontal Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-matte-gold/20 via-matte-gold to-matte-gold/20 hidden lg:block"></div>

                    {/* Events */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                {/* Connector Dot */}
                                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 hidden lg:block">
                                    <div className="relative">
                                        <div className="w-6 h-6 rounded-full bg-matte-gold border-4 border-charcoal"></div>
                                        <motion.div
                                            className="absolute inset-0 rounded-full bg-matte-gold"
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [0.6, 0, 0.6],
                                            }}
                                            transition={{
                                                duration: 2,
                                                delay: index * 0.3,
                                                repeat: Infinity,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Card */}
                                <div className="glass-gold rounded-2xl p-6 hover:scale-105 transition-smooth h-full">
                                    {/* Year */}
                                    <div className="text-center mb-4">
                                        <div className="inline-block px-4 py-2 bg-matte-gold/20 rounded-full">
                                            <span className="text-2xl font-bold text-matte-gold">
                                                {event.year}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-marble-white mb-3 text-center">
                                        {event.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-marble-white/80 text-center leading-relaxed">
                                        {event.description}
                                    </p>

                                    {/* Decorative Line */}
                                    <div className="w-16 h-1 bg-gradient-gold rounded-full mx-auto mt-4"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
                        <p className="text-2xl text-marble-white/90 leading-relaxed title-nastaliq">
                            «شیر و خورشید نمادی است که قرن‌ها با ایران همراه بوده و همچنان در قلب ایرانیان می‌درخشد»
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
