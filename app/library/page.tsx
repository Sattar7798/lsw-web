'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Book3D from '@/components/library/Book3D'
import { libraryData, Book } from '@/data/library'
import { documentsData } from '@/data/documents'
import Image from 'next/image'

const categories = ['All', 'History', 'Politics', 'Literature', 'Philosophy']

export default function LibraryPage() {
    const [filter, setFilter] = useState('All')

    const filteredBooks = filter === 'All'
        ? libraryData
        : libraryData.filter(book => book.category === filter)

    return (
        <main className="min-h-screen bg-[#0f0c09] text-[#e0dacd] relative overflow-hidden font-fa">

            {/* Ambient Atmosphere */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 w-full h-[600px] bg-gradient-to-b from-black via-transparent to-transparent z-10"></div>

            {/* Spotlight Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-yellow-600/5 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="container-custom pt-32 pb-20 relative z-20">

                {/* Header */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-block mb-6"
                    >
                        <div className="w-32 h-32 mx-auto border border-[#c5a059]/40 flex items-center justify-center bg-black/50 backdrop-blur-sm relative shadow-2xl overflow-hidden group transition-all hover:border-[#c5a059] hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] rounded-xl">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#c5a059]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                            <Image
                                src="/logo.jpg"
                                alt="هویت ملی"
                                fill
                                className="object-contain scale-90 hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-nastaliq text-[#c5a059] mb-6 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
                    >
                        کتابخانه ملی ایران
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-[#8a8175] max-w-2xl mx-auto font-light tracking-wide leading-relaxed"
                    >
                        مخزن اسناد ممنوعه، تاریخ شفاهی و میراث فرهنگی ملت ایران.
                        <br />
                        <span className="text-[#c5a059]/60 text-sm mt-2 block">آرشیوی برای آینده‌ای روشن</span>
                    </motion.p>
                </div>

                {/* Filter Tabs */}
                <div className="flex justify-center flex-wrap gap-4 mb-20">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${filter === cat
                                ? 'bg-[#c5a059] text-black border-[#c5a059] shadow-[0_0_20px_rgba(197,160,89,0.4)] transform scale-105'
                                : 'bg-transparent text-[#8a8175] border-[#3e342a] hover:border-[#c5a059] hover:text-[#c5a059]'
                                }`}
                        >
                            {cat === 'All' ? 'همه آثار' :
                                cat === 'History' ? 'تاریخ' :
                                    cat === 'Politics' ? 'سیاست' :
                                        cat === 'Literature' ? 'ادبیات' : 'فلسفه'}
                        </button>
                    ))}
                </div>

                {/* Book Grid */}
                {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-12 gap-y-24 px-8 perspective-1000">
                        {filteredBooks.map((book, index) => (
                            <div key={book.id} className="flex flex-col items-center group relative">
                                {/* Spotlight on Shelf */}
                                <div className="absolute -top-20 w-full h-40 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <Book3D book={book} />

                                {/* Shelf Line */}
                                <div className="absolute -bottom-8 w-[140%] h-4 bg-[#1a1510] rounded-sm shadow-2xl border-t border-[#3e342a] flex items-center justify-center">
                                    <div className="w-[98%] h-[1px] bg-white/5 mx-auto"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-[#8a8175] text-lg italic">
                        اثری در این دسته‌بندی یافت نشد.
                    </div>
                )}

                {/* Footer Decor */}
                {/* Featured Video Section */}
                <div className="mt-40 mb-32 relative z-10 px-4">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent mb-16"></div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="relative group">
                            {/* Frame Effects */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#c5a059] via-[#f3e5b5] to-[#c5a059] opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-700"></div>

                            <div className="relative rounded-xl overflow-hidden border border-[#c5a059]/30 bg-black/80 shadow-2xl">
                                {/* Cinema Borders */}
                                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none"></div>
                                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>

                                <video
                                    src="/book.MOV"
                                    controls
                                    className="w-full h-auto max-h-[70vh] object-contain mx-auto"
                                    style={{ boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)' }}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            {/* Decorative Caption */}
                            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-max text-center">
                                <div className="text-[#c5a059] font-nastaliq text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                    جلوه‌های ماندگار
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* National Archives Section (Restored) */}
                <div className="mt-40 pt-20 border-t border-[#3e342a]">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-nastaliq text-[#c5a059] mb-4">
                            تـالار اسنـاد دولتـی
                        </h2>
                        <p className="text-[#8a8175] font-light">
                            آرشیو رسمی بیانیه‌ها، گزارش‌های نقض حقوق بشر و نقشه‌های راه
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {documentsData.map((doc, i) => (
                            <div key={doc.id} className="relative group">
                                <a href={doc.slug} className="block group/card">
                                    <div className="bg-[#1a1510] border border-[#3e342a] p-8 rounded-xl relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#c5a059]/10 hover:border-[#c5a059]/40 h-full flex flex-col">
                                        {/* Book spine effect on left */}
                                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-l from-[#c5a059]/20 to-transparent"></div>

                                        <div className="relative z-10 flex-1 flex flex-col">
                                            <div className="flex justify-between items-start mb-4">
                                                <span className="text-xs text-[#8a8175] tracking-widest font-sans border border-[#3e342a] px-2 py-1 rounded">
                                                    {doc.publishDate}
                                                </span>
                                                <span className={`text-xs px-2 py-1 rounded ${doc.type === 'Constitution' ? 'bg-blue-900/30 text-blue-200' :
                                                    doc.type === 'Report' ? 'bg-red-900/30 text-red-200' :
                                                        'bg-[#c5a059]/10 text-[#c5a059]'
                                                    }`}>
                                                    {doc.type === 'Constitution' ? 'قانون اساسی' : doc.type === 'Report' ? 'گزارش' : 'سند رسمی'}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl text-[#e0dacd] font-bold mb-4 font-nastaliq leading-loose group-hover/card:text-[#c5a059] transition-colors">
                                                {doc.title}
                                            </h3>

                                            <p className="text-[#a89f91] text-sm leading-relaxed mb-8 font-sans line-clamp-3">
                                                {doc.description}
                                            </p>

                                            <div className="mt-auto flex items-center text-[#c5a059] text-xs font-bold uppercase tracking-widest group-hover/card:gap-2 transition-all font-sans">
                                                <span>مطالعه سند</span>
                                                <span className="mr-1">←</span>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    )
}
