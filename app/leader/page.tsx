'use client'

import { motion } from 'framer-motion'
import RoyalVideoPlayer from '@/components/leader/RoyalVideoPlayer'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function LeaderPage() {
    return (
        <main className="min-h-screen bg-charcoal relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-black/80 to-transparent z-10"></div>
                <div className="absolute -top-[20%] left-[20%] w-[600px] h-[600px] bg-matte-gold/5 blur-[120px] rounded-full animate-pulse-slow"></div>
                <div className="absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-blue-900/10 blur-[100px] rounded-full"></div>
            </div>

            <div className="relative z-10 pt-24 pb-20">
                <div className="container-custom">

                    {/* Header Section */}
                    <div className="text-center mb-16 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-bold mb-4">
                                <span className="text-gradient-gold drop-shadow-lg">رهبر اپوزیسیون</span>
                            </h1>
                            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-matte-gold to-transparent mx-auto rounded-full"></div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-2xl md:text-3xl text-matte-gold max-w-2xl mx-auto font-bold leading-relaxed tracking-wide drop-shadow-md"
                        >
                            پرچم کفن ماست
                            <br />
                            فخر وطن ماست
                        </motion.p>
                    </div>

                    {/* Video Section - The Request: "Chic and Precise Frame" */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <RoyalVideoPlayer />
                    </motion.div>

                    {/* Biography / Description Section */}
                    <div className="mt-24 grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="glass-gold p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-matte-gold/30 transition-colors">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-matte-gold/10 to-transparent rounded-bl-[4rem]"></div>

                                <h3 className="text-3xl font-bold text-matte-gold mb-6">مسیر مبارزه</h3>
                                <div className="space-y-6 text-lg leading-loose text-justify text-marble-white/90">
                                    <p>
                                        ایشان با سال‌ها تجربه در عرصه سیاست بین‌الملل و حقوق بشر، پرچمدار گذار مسالمت‌آمیز از استبداد به دموکراسی هستند.
                                        دیدگاه ایشان بر مبنای منشور جهانی حقوق بشر، سکولاریسم و حفظ تمامیت ارضی ایران استوار است.
                                    </p>
                                    <p>
                                        به عنوان صدای رسای ملت ایران در مجامع بین‌المللی، ایشان همواره بر حق تعیین سرنوشت مردم توسط خود مردم تأکید داشته‌اند
                                        و برای ایجاد همبستگی میان تمام نیروهای اپوزیسیون دموکراتیک تلاش می‌کنند.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col gap-6"
                        >
                            {/* Call to Action Cards */}
                            <Link href="/vision" className="group block">
                                <div className="bg-charcoal/50 border border-white/10 p-6 rounded-2xl flex items-center gap-6 hover:bg-white/5 transition-all hover:scale-[1.02] hover:border-matte-gold/50 cursor-pointer">
                                    <div className="w-16 h-16 rounded-full bg-blue-900/30 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                                        📜
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-1 group-hover:text-matte-gold transition-colors">چشم‌انداز آینده</h4>
                                        <p className="text-sm text-gray-400">مطالعه مانیفست و طرح‌های بازسازی ایران</p>
                                    </div>
                                </div>
                            </Link>

                            <Link href="/contact" className="group block">
                                <div className="bg-gradient-to-r from-matte-gold/10 to-transparent border border-matte-gold/30 p-6 rounded-2xl flex items-center gap-6 hover:bg-matte-gold/20 transition-all hover:scale-[1.02] cursor-pointer">
                                    <div className="w-16 h-16 rounded-full bg-matte-gold/20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform text-matte-gold">
                                        📞
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-matte-gold mb-1">تماس مستقیم</h4>
                                        <p className="text-sm text-gray-300">ارتباط با دفتر رهبری و تیم مشاوران</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    )
}
