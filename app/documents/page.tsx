'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { documentsData } from '@/data/documents'

export default function DocumentsPage() {
    return (
        <main className="min-h-screen bg-[#1a1510] text-[#e0dacd] font-serif relative overflow-hidden">
            {/* Wood Texture/Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png")',
                backgroundSize: '300px'
            }}></div>

            {/* Ambient Lighting */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-yellow-600/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="container-custom pt-32 pb-20 relative z-10">
                <div className="text-center mb-20">
                    <div className="w-20 h-20 mx-auto border-2 border-[#c5a059] rounded-full flex items-center justify-center mb-6">
                        <span className="text-4xl text-[#c5a059]">⚖️</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-nastaliq text-[#c5a059] mb-4 drop-shadow-md">
                        کتابخانه اسناد ملی
                    </h1>
                    <div className="w-64 h-1 bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent mx-auto"></div>
                    <p className="mt-6 text-lg text-[#a89f91] max-w-2xl mx-auto font-sans">
                        آرشیو رسمی اسناد حقوقی، بیانیه‌های بنیادین و نقشه‌های راه برای گذار به دموکراسی سکولار.
                    </p>
                </div>

                {/* Shelves Layout */}
                <div className="grid gap-16">
                    {['Constitution', 'Charter', 'Reports'].map((category, catIndex) => {
                        const docs = documentsData.filter(d =>
                            (category === 'Reports' ? (d.type === 'Report' || d.type === 'Legal') : d.type === category)
                        );

                        if (docs.length === 0) return null;

                        return (
                            <div key={category} className="relative group">
                                <h2 className="text-2xl font-bold text-[#c5a059] mb-8 pr-4 border-r-4 border-[#c5a059] font-nastaliq">
                                    {category === 'Constitution' ? 'قانون اساسی' : category === 'Charter' ? 'منشور و پیمان‌نامه‌ها' : 'گزارش‌های تخصصی'}
                                </h2>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                                    {docs.map((doc, i) => (
                                        <motion.div
                                            key={doc.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.2 }}
                                        >
                                            <Link href={doc.slug} className="block group/card">
                                                <div className="bg-[#241e18] border border-[#3e342a] p-8 rounded-sm shadow-2xl relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[#c5a059]/10 hover:border-[#c5a059]/40">
                                                    {/* Book spine effect on left */}
                                                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-[#110e0b] to-[#2c251e]"></div>

                                                    {/* Emblem Watermark */}
                                                    <div className="absolute -bottom-10 -left-10 text-9xl text-[#c5a059]/5 rotate-12 group-hover/card:rotate-45 transition-transform duration-700">
                                                        🦁
                                                    </div>

                                                    <div className="pl-4 relative z-10">
                                                        <span className="text-xs text-[#8a8175] uppercase tracking-widest mb-2 block font-sans">
                                                            {doc.publishDate}
                                                        </span>
                                                        <h3 className="text-2xl text-[#e0dacd] font-bold mb-4 font-nastaliq leading-loose group-hover/card:text-[#c5a059] transition-colors">
                                                            {doc.title}
                                                        </h3>
                                                        <p className="text-[#a89f91] text-sm leading-relaxed mb-6 font-sans line-clamp-3">
                                                            {doc.description}
                                                        </p>

                                                        <div className="flex items-center text-[#c5a059] text-xs font-bold uppercase tracking-widest group-hover/card:gap-2 transition-all font-sans">
                                                            <span>مطالعه سند</span>
                                                            <span className="mr-1">←</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Shelf Bottom */}
                                <div className="absolute -bottom-8 left-0 right-0 h-4 bg-[#0f0c09] rounded-b-lg shadow-xl translate-y-4">
                                    <div className="absolute top-0 w-full h-[1px] bg-[#3e342a]"></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </main>
    )
}
