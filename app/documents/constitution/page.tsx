'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { constitutionData } from '@/data/constitution'
import Link from 'next/link'

export default function ConstitutionPage() {
    const [activeChapter, setActiveChapter] = useState(0)

    return (
        <main className="min-h-screen bg-[#f3efe6] text-[#2c251e] font-sans relative">
            {/* Paper Texture */}
            <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply" style={{
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")',
                filter: 'contrast(1.2)'
            }}></div>

            {/* Header / Toolbar */}
            <header className="sticky top-0 z-50 bg-[#e6dfd1] border-b border-[#c5bba8] shadow-sm">
                <div className="container-custom h-16 flex items-center justify-between">
                    <Link href="/documents" className="flex items-center gap-2 text-[#6b5f4f] hover:text-[#2c251e] transition-colors">
                        <span>←</span>
                        <span className="text-sm font-bold">بازگشت به کتابخانه</span>
                    </Link>
                    <h1 className="text-xl font-nastaliq text-[#8c7b64]">پیش‌نویس قانون اساسی دوران گذار</h1>
                    <button className="px-4 py-1.5 bg-[#2c251e] text-[#f3efe6] text-sm rounded font-bold hover:bg-[#4a3f33] transition-colors shadow">
                        دانلود نسخه PDF
                    </button>
                </div>
            </header>

            <div className="container-custom py-12 grid lg:grid-cols-4 gap-12">

                {/* Table of Contents (Sidebar) */}
                <aside className="lg:col-span-1 hidden lg:block sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pl-4">
                    <h3 className="font-bold text-[#8c7b64] mb-4 uppercase text-xs tracking-widest border-b border-[#c5bba8] pb-2">
                        فهرست فصول
                    </h3>
                    <ul className="space-y-1">
                        {constitutionData.map((chapter, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => setActiveChapter(index)}
                                    className={`w-full text-right px-4 py-3 rounded-lg text-sm transition-all ${activeChapter === index
                                            ? 'bg-[#2c251e] text-[#f3efe6] shadow-md font-bold'
                                            : 'text-[#6b5f4f] hover:bg-[#e6dfd1]'
                                        }`}
                                >
                                    <span className="opacity-50 ml-2">فصل {chapter.number}:</span>
                                    {chapter.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                {/* Main Content (The Article) */}
                <div className="lg:col-span-3">
                    <div className="bg-white/60 backdrop-blur-sm border border-[#c5bba8] p-8 md:p-16 shadow-xl relative min-h-[80vh]">
                        {/* Decorative Corner */}
                        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#c5a059]/30 rounded-tr-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#c5a059]/30 rounded-bl-3xl"></div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeChapter}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="text-center mb-12">
                                    <span className="text-[#c5a059] font-bold tracking-widest text-sm uppercase block mb-2">
                                        فصل {constitutionData[activeChapter].number}
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-nastaliq text-[#2c251e]">
                                        {constitutionData[activeChapter].title}
                                    </h2>
                                    <div className="w-24 h-1 bg-[#c5bba8] mx-auto mt-6"></div>
                                </div>

                                <div className="space-y-12">
                                    {constitutionData[activeChapter].articles.map((article) => (
                                        <div key={article.number} className="relative group">
                                            <div className="absolute -right-12 top-0 w-8 h-8 rounded-full bg-[#e6dfd1] flex items-center justify-center text-[#8c7b64] font-serif font-bold text-sm border border-[#c5bba8] hidden md:flex">
                                                {article.number}
                                            </div>
                                            <h3 className="text-xl font-bold text-[#c5a059] mb-4 font-nastaliq group-hover:text-[#8c7b64] transition-colors">
                                                اصل {article.number}: {article.title}
                                            </h3>
                                            <p className="text-lg leading-loose text-justify text-[#4a3f33]">
                                                {article.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation Footer */}
                        <div className="mt-20 pt-8 border-t border-[#c5bba8] flex justify-between items-center text-sm font-bold text-[#6b5f4f]">
                            <button
                                onClick={() => setActiveChapter(Math.max(0, activeChapter - 1))}
                                disabled={activeChapter === 0}
                                className="disabled:opacity-30 hover:text-[#2c251e] transition-colors flex items-center gap-2"
                            >
                                <span>→</span> فصل قبل
                            </button>
                            <span>
                                صفحه {activeChapter + 1} از {constitutionData.length}
                            </span>
                            <button
                                onClick={() => setActiveChapter(Math.min(constitutionData.length - 1, activeChapter + 1))}
                                disabled={activeChapter === constitutionData.length - 1}
                                className="disabled:opacity-30 hover:text-[#2c251e] transition-colors flex items-center gap-2"
                            >
                                فصل بعد <span>←</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
