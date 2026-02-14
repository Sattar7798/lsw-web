'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CopyLinkButton } from '@/components/CopyLinkButton'
import WavingFlag from '@/components/WavingFlag'

import { NewsItem } from '@/data/news'

interface Props {
    news: NewsItem;
    relatedNews: NewsItem[];
}

export default function NewsArticleContent({ news, relatedNews }: Props) {
    return (
        <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#111] to-[#0a0a0a] pb-24 relative font-fa">
            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 w-full h-1 z-50 bg-white/5 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: "circOut" }}
                style={{ scaleX: 0 }}
            >
                <div className="h-full bg-gradient-to-r from-matte-gold via-yellow-400 to-matte-gold shadow-[0_0_20px_rgba(212,175,55,0.6)]"></div>
            </motion.div>

            {/* Immersive Hero Section */}
            <div className="relative h-[75vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-[#111]/70 to-[#111] z-20"></div>

                {/* Background with Animated Flag */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-black">
                    {/* Animated Lion & Sun Flag */}
                    <div className="absolute inset-0 opacity-35">
                        <WavingFlag />
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full z-30 container-custom pb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="max-w-5xl"
                    >
                        <div className="flex flex-wrap gap-4 mb-8">
                            <span className="bg-gradient-to-r from-matte-gold to-yellow-500 text-black px-5 py-2 rounded-lg text-sm font-extrabold shadow-xl shadow-matte-gold/30 tracking-wide">
                                {news.category}
                            </span>
                            <span className="bg-white/10 backdrop-blur-lg text-white/95 border border-white/20 px-5 py-2 rounded-lg text-sm font-semibold">
                                {news.date}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-10 drop-shadow-2xl tracking-tight">
                            {news.title}
                        </h1>

                        <div className="flex items-center gap-5 border-t border-white/20 pt-7">
                            <div className="relative w-20 h-20 rounded-xl p-[2px] bg-gradient-to-br from-matte-gold via-yellow-500 to-yellow-600 shadow-lg shadow-matte-gold/40">
                                <div className="w-full h-full rounded-xl bg-white flex items-center justify-center overflow-hidden">
                                    <img
                                        src="/logo.jpg"
                                        alt="Lion and Sun Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                            <div>
                                <p className="font-extrabold text-white text-xl">{news.author}</p>
                                <p className="text-base text-matte-gold/90 font-medium">دبیرخانه شورای ملی</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Layout */}
            <div className="container-custom relative z-30 -mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

                    {/* Main Article Content */}
                    <div className="lg:col-span-8">
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-[#1a1a1a]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl relative overflow-hidden"
                        >
                            {/* Decorative Top Border */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-matte-gold to-transparent shadow-lg shadow-matte-gold/50"></div>

                            <div className="prose prose-lg md:prose-xl prose-invert max-w-none
                                prose-headings:font-black prose-headings:text-white prose-headings:mt-12 prose-headings:mb-6 prose-headings:tracking-tight
                                prose-h2:text-2xl md:text-3xl prose-h2:border-r-4 prose-h2:border-matte-gold prose-h2:pr-6 prose-h2:py-1
                                prose-h3:text-xl md:text-2xl prose-h3:text-matte-gold/90
                                prose-p:text-gray-300 prose-p:leading-[2.2] prose-p:text-justify prose-p:font-light prose-p:text-lg md:text-[1.15rem] prose-p:mb-8 prose-p:tracking-normal
                                prose-strong:text-white prose-strong:font-bold
                                prose-em:text-matte-gold/80 prose-em:italic
                                prose-li:text-gray-300 prose-li:leading-9 prose-li:text-lg prose-li:mb-2
                                prose-ul:space-y-2 prose-ol:space-y-2 prose-ul:my-6 prose-ol:my-6
                                prose-blockquote:border-r-[3px] prose-blockquote:border-matte-gold prose-blockquote:bg-white/[0.03] prose-blockquote:py-5 prose-blockquote:pr-6 prose-blockquote:pl-4 prose-blockquote:my-8 prose-blockquote:rounded-lg prose-blockquote:italic prose-blockquote:text-gray-200 prose-blockquote:font-normal prose-blockquote:shadow-none
                                prose-a:text-matte-gold prose-a:no-underline hover:prose-a:underline prose-a:transition-all
                                prose-img:rounded-xl prose-img:shadow-xl prose-img:my-8
                                ">
                                <div dangerouslySetInnerHTML={{ __html: news.content }} />
                            </div>

                            {/* Visual Separator */}
                            <div className="my-16 flex items-center justify-center">
                                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full"></div>
                                <span className="px-6 text-matte-gold/50 text-2xl">◆</span>
                                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full"></div>
                            </div>

                            {/* Engagement Section */}
                            <div className="mt-10">
                                <h4 className="text-white/80 font-semibold mb-4 text-sm tracking-wide">اشتراک‌گذاری:</h4>
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
                                        className="flex items-center gap-2 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 text-[#1DA1F2] border border-[#1DA1F2]/20 hover:border-[#1DA1F2]/40 px-4 py-2.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-[#1DA1F2]/10 group"
                                    >
                                        <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                        <span className="font-medium text-sm">توییتر</span>
                                    </button>
                                    <button
                                        onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(news.title)}`, '_blank')}
                                        className="flex items-center gap-2 bg-[#229ED9]/10 hover:bg-[#229ED9]/20 text-[#229ED9] border border-[#229ED9]/20 hover:border-[#229ED9]/40 px-4 py-2.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-[#229ED9]/10 group"
                                    >
                                        <svg className="w-5 h-5 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                        </svg>
                                        <span className="font-medium text-sm">تلگرام</span>
                                    </button>
                                    <CopyLinkButton />
                                </div>
                            </div>
                        </motion.article>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* Related News Widget */}
                        <div className="sticky top-28">
                            <div className="bg-[#1a1a1a]/80 backdrop-blur-2xl rounded-3xl p-7 border border-white/10 shadow-2xl">
                                <div className="flex items-center mb-7 pb-5 border-b border-white/10">
                                    <h3 className="text-xl font-black text-white flex items-center gap-3">
                                        <span className="w-1.5 h-7 bg-gradient-to-b from-matte-gold to-yellow-600 rounded-full"></span>
                                        اخبار مرتبط
                                    </h3>
                                </div>

                                <div className="space-y-5">
                                    {relatedNews.slice(0, 4).map(item => (
                                        <Link key={item.id} href={`/news/${item.slug}`} className="block group">
                                            <div className="flex gap-5 p-4 rounded-2xl hover:bg-white/[0.07] transition-all duration-300 border border-transparent hover:border-white/10 hover:shadow-lg">
                                                <div className="w-24 h-24 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex-shrink-0 relative overflow-hidden shadow-lg border border-white/5">
                                                    <div className="absolute inset-0 flex items-center justify-center text-3xl grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500">
                                                        📰
                                                    </div>
                                                </div>
                                                <div className="flex flex-col justify-center flex-1 min-w-0">
                                                    <span className="text-[11px] uppercase tracking-widest text-matte-gold mb-2 opacity-90 font-bold">{item.category}</span>
                                                    <h4 className="text-gray-100 font-bold text-base leading-snug group-hover:text-white transition-colors line-clamp-2">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                <Link href="/news" className="block text-center mt-7 pt-6 py-4 text-base text-white/60 hover:text-matte-gold transition-colors border-t border-white/10 font-semibold hover:bg-white/[0.03] rounded-b-xl">
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
