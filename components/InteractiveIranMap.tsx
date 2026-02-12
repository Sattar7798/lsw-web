'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface Province {
    name: string
    capital: string
    description: string
}

const provinces: Province[] = [
    { name: 'تهران', capital: 'تهران', description: 'پایتخت ایران - قلب تپنده کشور' },
    { name: 'اصفهان', capital: 'اصفهان', description: 'نصف جهان - شهر تاریخ و هنر' },
    { name: 'آذربایجان شرقی', capital: 'تبریز', description: 'شهر اولین‌ها - مرکز فرهنگ آذری' },
    { name: 'خراسان رضوی', capital: 'مشهد', description: 'خورشید شرق - قطب معنوی ایران' },
    { name: 'فارس', capital: 'شیراز', description: 'دار شعر و ادب - تخت جمشید' },
    { name: 'خوزستان', capital: 'اهواز', description: 'سرزمین نفت و آب - استان اقوام' },
]

export default function InteractiveIranMap() {
    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null)
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    // موقعیت‌های دقیق شهرها روی نقشه واقعی ایران
    const cityPositions = [
        { top: '28%', left: '42%' }, // تهران (وسط بالا)
        { top: '50%', left: '48%' }, // اصفهان (مرکز)
        { top: '12%', left: '25%' }, // تبریز (بالا سمت چپ غربی)
        { top: '32%', left: '72%' }, // مشهد (شمال شرقی)
        { top: '68%', left: '52%' }, // شیراز (جنوب)
        { top: '65%', left: '38%' }, // اهواز (جنوب غربی)
    ]

    return (
        <div className="relative w-full h-full bg-charcoal rounded-2xl overflow-hidden">
            {/* تصویر واقعی نقشه ایران */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: 'url(/iranmap.jpg)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            {/* لایه تاریک برای کنتراست بهتر */}
            <div className="absolute inset-0 bg-gradient-to-br from-deep-emerald/20 via-transparent to-ruby-red/20" />

            {/* نقاط تعاملی شهرها */}
            <div className="relative w-full h-full">
                {provinces.map((province, index) => (
                    <motion.button
                        key={index}
                        className="absolute group z-10"
                        style={cityPositions[index]}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => setSelectedProvince(province)}
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {/* نقطه شهر */}
                        <div className="relative">
                            <div
                                className={`w-4 h-4 rounded-full transition-all duration-300 shadow-lg ${hoveredIndex === index || selectedProvince?.name === province.name
                                    ? 'bg-matte-gold scale-150 shadow-matte-gold/50'
                                    : 'bg-marble-white shadow-marble-white/50'
                                    }`}
                            />

                            {/* انیمیشن پالس */}
                            {(hoveredIndex === index || selectedProvince?.name === province.name) && (
                                <motion.div
                                    className="absolute inset-0 rounded-full bg-matte-gold"
                                    initial={{ scale: 1, opacity: 0.6 }}
                                    animate={{ scale: 3, opacity: 0 }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            )}
                        </div>

                        {/* برچسب شهر هنگام hover */}
                        <div
                            className={`absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap transition-opacity ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <div className="glass-gold px-3 py-1 rounded-lg text-sm font-bold text-matte-gold shadow-xl">
                                {province.name}
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* کارت اطلاعات استان */}
            {selectedProvince && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-4 left-4 right-4 glass-gold rounded-2xl p-6 shadow-2xl z-20"
                >
                    <div className="flex justify-between items-start mb-3">
                        <h3 className="text-2xl font-bold text-matte-gold">{selectedProvince.name}</h3>
                        <button
                            onClick={() => setSelectedProvince(null)}
                            className="text-marble-white/60 hover:text-marble-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="space-y-2">
                        <p className="text-marble-white/90">
                            <span className="text-matte-gold font-semibold">پایتخت: </span>
                            {selectedProvince.capital}
                        </p>
                        <p className="text-marble-white/80 leading-relaxed">
                            {selectedProvince.description}
                        </p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-matte-gold/20">
                        <p className="text-sm text-marble-white/60 text-center">
                            روی نقاط دیگر کلیک کنید تا اطلاعات بیشتر ببینید
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
