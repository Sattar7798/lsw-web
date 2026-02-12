'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CharterPage() {
    const [signed, setSigned] = useState(false)
    const [signCount, setSignCount] = useState(140523)

    const handleSign = () => {
        if (!signed) {
            setSigned(true)
            setSignCount(prev => prev + 1)
        }
    }

    return (
        <main className="min-h-screen bg-[#e3ddd3] text-[#1c1917] font-sans relative pb-20">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #444 1px, transparent 0)',
                backgroundSize: '32px 32px'
            }}></div>

            {/* Header */}
            <nav className="relative z-10 bg-[#1c1917] text-[#e3ddd3] py-4">
                <div className="container-custom flex justify-between items-center">
                    <Link href="/documents" className="text-sm font-bold opacity-80 hover:opacity-100 transition-opacity flex items-center gap-2">
                        <span>←</span> بازگشت به کتابخانه
                    </Link>
                    <span className="font-nastaliq text-xl">منشور حقوق شهروندی</span>
                </div>
            </nav>

            <div className="container-custom pt-16">
                <div className="max-w-4xl mx-auto">
                    {/* The Scroll/Document Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#f0ece6] shadow-2xl relative overflow-hidden"
                    >
                        {/* Decorative Top Border */}
                        <div className="h-4 bg-[#8a1c1c] w-full"></div>
                        <div className="h-1 bg-[#c5a059] w-full"></div>

                        <div className="p-12 md:p-20">
                            <div className="text-center mb-16">
                                <h1 className="text-5xl md:text-6xl font-nastaliq text-[#1c1917] mb-8 leading-relaxed">
                                    منشور ایران آزاد
                                </h1>
                                <p className="text-xl text-[#57534e] font-sans max-w-2xl mx-auto">
                                    ما امضاکنندگان این منشور، بر اصول زیر برای بنیان‌گذاری ایرانی آزاد، سکولار و دموکراتیک هم‌قسم می‌شویم.
                                </p>
                            </div>

                            <div className="space-y-12 font-sans">
                                {[
                                    { title: "اصل اول: آزادی بی قید و شرط", desc: "آزادی اندیشه، بیان، پوشش و سبک زندگی حق مسلم هر ایرانی است و هیچ نهادی حق محدود کردن آن را ندارد." },
                                    { title: "اصل دوم: سکولاریسم", desc: "دین از سیاست جداست. باورهای شخصی محترم، اما در قانون‌گذاری و اداره کشور هیچ‌گونه دخالتی نخواهند داشت." },
                                    { title: "اصل سوم: برابری", desc: "تمامی شهروندان فارغ از جنسیت، قومیت، مذهب و گرایش جنسی در برابر قانون برابرند. تبعیض جرم‌انگاری خواهد شد." },
                                    { title: "اصل چهارم: صلح و دوستی", desc: "ایرانِ آینده با تمامی همسایگان و جامعه جهانی بر اساس احترام متقابل و منافع ملی رابطه صلح‌آمیز خواهد داشت." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-start">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-[#1c1917] flex items-center justify-center font-bold text-xl font-serif">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-[#8a1c1c] mb-3 font-nastaliq">{item.title}</h3>
                                            <p className="text-lg leading-loose text-[#44403c] text-justify">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Sign Section */}
                            <div className="mt-20 pt-12 border-t-2 border-[#d6d3d1] text-center">
                                <div className="mb-8">
                                    <span className="text-6xl font-bold font-serif text-[#1c1917] tabular-nums tracking-tighter block mb-2">
                                        {signCount.toLocaleString('fa-IR')}
                                    </span>
                                    <span className="text-[#57534e] uppercase tracking-widest text-sm font-bold">
                                        تعداد امضاکنندگان تا این لحظه
                                    </span>
                                </div>

                                <button
                                    onClick={handleSign}
                                    disabled={signed}
                                    className={`group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8a1c1c] ${signed ? 'bg-[#15803d] cursor-default' : 'bg-[#8a1c1c] hover:bg-[#b91c1c]'
                                        }`}
                                >
                                    <span className={`absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black`}></span>
                                    <span className="relative font-nastaliq text-2xl">
                                        {signed ? 'امضای شما ثبت شد' : 'منشور را امضا می‌کنم'}
                                    </span>
                                </button>

                                {signed && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-6 text-[#15803d] font-bold"
                                    >
                                        با سپاس. نام شما در تاریخ ثبت گردید.
                                    </motion.p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}
