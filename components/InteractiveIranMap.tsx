'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Province {
    name: string
    capital: string
    description: string
}

const provinces: Province[] = [
    { name: 'تهران', capital: 'تهران', description: 'پایتخت ایران - کانون اصلی اعتراضات' },
    { name: 'اصفهان', capital: 'اصفهان', description: 'اعتصابات سراسری در بازار و صنایع' },
    { name: 'آذربایجان شرقی', capital: 'تبریز', description: 'تجمعات دانشجویی و مردمی گسترده' },
    { name: 'خراسان رضوی', capital: 'مشهد', description: 'مبارزه در اطراف حرم و خیابان‌های اصلی' },
    { name: 'فارس', capital: 'شیراز', description: 'شب‌های روشن مقاومت در فرهنگ‌شهر' },
    { name: 'خوزستان', capital: 'اهواز', description: 'ایستادگی کارگران نفت و مردم غیور' },
    { name: 'کردستان', capital: 'سنندج', description: 'خاستگاه شعار زن زندگی آزادی' },
    { name: 'سیستان و بلوچستان', capital: 'زاهدان', description: 'جمعه‌های خونین و فریاد دادخواهی' },
]

export default function InteractiveIranMap() {
    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [liveEvent, setLiveEvent] = useState<string>('')

    // موقعیت‌های تخمینی شهرها روی نقشه
    const cityPositions = [
        { top: '28%', left: '42%' }, // تهران
        { top: '50%', left: '48%' }, // اصفهان
        { top: '12%', left: '25%' }, // تبریز
        { top: '32%', left: '72%' }, // مشهد
        { top: '68%', left: '52%' }, // شیراز
        { top: '65%', left: '38%' }, // اهواز
        { top: '35%', left: '15%' }, // سنندج (تخمینی)
        { top: '75%', left: '80%' }, // زاهدان (تخمینی)
    ]

    // Simulate Live Feed
    useEffect(() => {
        const events = [
            'گزارش شعارنویسی در تهران پارس',
            'تجمع پراکنده در چهارباغ اصفهان',
            'پخش شبنامه در بازار تبریز',
            'اعتصاب کامیون‌داران در بندرعباس',
            'فریاد مرگ بر دیکتاتور از بام‌های شیراز',
            'قطعی اینترنت در سنندج گزارش شد',
            'خیزش مردم زاهدان پس از نماز جمعه'
        ]
        const interval = setInterval(() => {
            setLiveEvent(events[Math.floor(Math.random() * events.length)])
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative w-full h-full bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-inner border border-white/5">
            {/* نقشه پایه */}
            <div
                className="absolute inset-0 opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                style={{
                    backgroundImage: 'url(/iranmap.jpg)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            {/* افکت رادار اسکن کننده */}
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,transparent_90deg,rgba(212,175,55,0.1)_180deg,transparent_180deg)] animate-[spin_4s_linear_infinite] opacity-30 pointer-events-none rounded-full scale-150"></div>

            {/* نقاط شهرها */}
            <div className="relative w-full h-full">
                {provinces.map((province, index) => {
                    const pos = cityPositions[index] || { top: '50%', left: '50%' }
                    return (
                        <motion.button
                            key={index}
                            className="absolute group z-10"
                            style={pos}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={() => setSelectedProvince(province)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <div className="relative flex items-center justify-center">
                                {/* نقطه اصلی */}
                                <div className={`w-3 h-3 rounded-full z-20 transition-colors ${hoveredIndex === index ? 'bg-white' : 'bg-[#d4af37]'
                                    } shadow-[0_0_10px_#d4af37]`} />

                                {/* پالس همیشگی (ضریان قلب مقاومت) */}
                                <motion.div
                                    className="absolute rounded-full border border-[#d4af37]"
                                    initial={{ width: '100%', height: '100%', opacity: 1 }}
                                    animate={{ width: '300%', height: '300%', opacity: 0 }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: index * 0.3, // تاخیر تصادفی برای ارگانیک بودن
                                        ease: "easeOut"
                                    }}
                                />

                                {/* پالس دوم */}
                                <motion.div
                                    className="absolute rounded-full bg-[#d4af37]/30"
                                    initial={{ width: '100%', height: '100%', opacity: 0.5 }}
                                    animate={{ width: '200%', height: '200%', opacity: 0 }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: (index * 0.3) + 1,
                                        ease: "easeOut"
                                    }}
                                />
                            </div>

                            {/* تولتیپ نام شهر */}
                            <AnimatePresence>
                                {hoveredIndex === index && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap z-30"
                                    >
                                        <div className="bg-black/80 backdrop-blur border border-[#d4af37]/50 px-3 py-1 rounded text-xs text-[#d4af37] font-bold shadow-xl">
                                            {province.name}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    )
                })}
            </div>

            {/* فید زنده (Live Feed Overlay) */}
            <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <motion.div
                    key={liveEvent}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 bg-black/60 backdrop-blur-md border-r-2 border-red-500 px-4 py-2 rounded-l-lg"
                >
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    <span className="text-white text-xs font-mono font-bold tracking-tight">
                        LIVE: {liveEvent} ...
                    </span>
                </motion.div>
            </div>

            {/* پنل اطلاعات پایین */}
            <AnimatePresence>
                {selectedProvince && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-30 text-center"
                    >
                        <h3 className="text-2xl font-bold text-[#d4af37] mb-1">{selectedProvince.name}</h3>
                        <p className="text-gray-300 text-sm">{selectedProvince.description}</p>
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedProvince(null); }}
                            className="mt-4 text-xs text-gray-500 hover:text-white"
                        >
                            بستن ×
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
