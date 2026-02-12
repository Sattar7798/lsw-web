'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CopyLinkButton } from '@/components/CopyLinkButton'

import { NewsItem } from '@/data/news'

interface Props {
    news: NewsItem;
    relatedNews: NewsItem[];
}

export default function NewsArticleContent({ news, relatedNews }: Props) {
    return (
        <main className="min-h-screen bg-[#111] pb-20 relative font-fa">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 w-full h-1.5 z-50 bg-white/5 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: "circOut" }}
                style={{ scaleX: 0 }} // Note: For real scroll progress, useScroll hook is needed, but keeping original animation for now
            >
                <div className="h-full bg-gradient-to-r from-matte-gold to-yellow-500 shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
            </motion.div>

            {/* Immersive Hero Section */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#111]/60 to-[#111] z-20"></div>

                {/* Background Image / Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-black">
                    {/* In production: <Image src={news.image} layout="fill" objectFit="cover" ... /> */}
                    <div className="w-full h-full flex items-center justify-center opacity-20">
                        {/* Abstract Pattern */}
                        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <span className="text-9xl grayscale opacity-50">📰</span>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full z-30 container-custom pb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-4xl"
                    >
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="bg-matte-gold/90 text-[#111] px-4 py-1.5 rounded text-sm font-bold shadow-lg shadow-matte-gold/20">
                                {news.category}
                            </span>
                            <span className="bg-white/10 backdrop-blur-md text-white/90 border border-white/10 px-4 py-1.5 rounded text-sm font-medium">
                                {news.date}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight md:leading-snug mb-8 drop-shadow-2xl">
                            {news.title}
                        </h1>

                        <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-matte-gold to-yellow-700 p-[2px]">
                                <div className="w-full h-full rounded-full bg-[#222] flex items-center justify-center text-xl">
                                    🦁
                                </div>
                            </div>
                            <div>
                                <p className="font-bold text-white text-lg">{news.author}</p>
                                <p className="text-sm text-matte-gold/80">دبیرخانه شورای ملی</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Layout */}
            <div className="container-custom relative z-30 -mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Main Article Content */}
                    <div className="lg:col-span-8">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#1a1a1a]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 md:p-10 lg:p-12 shadow-2xl relative overflow-hidden"
                        >
                            {/* Decorative Top Border */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-matte-gold/50 to-transparent"></div>

                            <div className="prose prose-lg md:prose-xl prose-invert max-w-none 
                                prose-headings:font-bold prose-headings:text-white prose-headings:mt-10 prose-headings:mb-6
                                prose-p:text-gray-300 prose-p:leading-10 prose-p:text-justify prose-p:font-light
                                prose-strong:text-matte-gold prose-strong:font-bold
                                prose-li:text-gray-300 prose-li:leading-8
                                prose-blockquote:border-r-4 prose-blockquote:border-matte-gold prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:pr-6 prose-blockquote:rounded-l-lg prose-blockquote:italic
                                "
                            >
                                <div dangerouslySetInnerHTML={{ __html: news.content }} />
                            </div>

                            {/* Engagement Section */}
                            <div className="mt-16 pt-8 border-t border-white/5">
                                <h4 className="text-white/60 text-sm font-bold mb-4">اشتراک‌گذاری این خبر:</h4>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                                        className="flex items-center gap-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] border border-[#1DA1F2]/20 px-6 py-3 rounded-xl transition-all active:scale-95"
                                    >
                                        <span className="text-lg">𝕏</span>
                                        <span className="font-bold">توییتر</span>
                                    </button>
                                    <button
                                        onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(news.title)}`, '_blank')}
                                        className="flex items-center gap-2 bg-[#229ED9]/10 hover:bg-[#229ED9]/20 text-[#229ED9] border border-[#229ED9]/20 px-6 py-3 rounded-xl transition-all active:scale-95"
                                    >
                                        <span className="text-lg">✈️</span>
                                        <span className="font-bold">تلگرام</span>
                                    </button>
                                    <CopyLinkButton />
                                </div>
                            </div>
                        </motion.article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* Related News Widget */}
                        <div className="sticky top-24">
                            <div className="bg-[#1a1a1a]/60 backdrop-blur-lg rounded-2xl p-6 border border-white/5">
                                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <span className="w-1 h-6 bg-matte-gold rounded-full"></span>
                                        اخبار مرتبط
                                    </h3>
                                </div>

                                <div className="space-y-4">
                                    {relatedNews.slice(0, 4).map(item => (
                                        <Link key={item.id} href={`/news/${item.slug}`} className="block group">
                                            <div className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-all border border-transparent hover:border-white/5">
                                                <div className="w-20 h-20 bg-gray-800 rounded-lg flex-shrink-0 relative overflow-hidden shadow-inner">
                                                    {/* Thumbnail Placeholder */}
                                                    <div className="absolute inset-0 flex items-center justify-center text-2xl grayscale opacity-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500">
                                                        📰
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <span className="text-[10px] uppercase tracking-wider text-matte-gold mb-1 opacity-80">{item.category}</span>
                                                    <h4 className="text-gray-200 font-bold text-sm leading-snug group-hover:text-white transition-colors line-clamp-2">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                <Link href="/news" className="block text-center mt-6 py-3 text-sm text-white/50 hover:text-matte-gold transition-colors border-t border-white/5">
                                    مشاهده آرشیو اخبار →
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    )
}
