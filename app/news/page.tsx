'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { newsData, Category } from '@/data/news'
import NewsCard from '@/components/news/NewsCard'
import Link from 'next/link'

export default function NewsPage() {
    const [filter, setFilter] = useState<Category | 'all'>('all')

    const filteredNews = filter === 'all'
        ? newsData
        : newsData.filter(item => item.category === filter)

    const featuredNews = newsData.find(item => item.featured) || newsData[0]

    return (
        <main className="min-h-screen bg-charcoal pt-24 pb-20 relative">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none fixed"></div>

            <div className="container-custom relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-nastaliq text-gradient-gold mb-6 leading-relaxed"
                    >
                        اخبار و بیانیه‌های رسمی
                    </motion.h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        آخرین مواضع، تحلیل‌ها و اخبار فوری اپوزیسیون شیر و خورشید را از اینجا دنبال کنید.
                    </p>
                </div>

                {/* Featured News (Only show if no filter selected) */}
                {filter === 'all' && featuredNews && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-16"
                    >
                        <Link href={`/news/${featuredNews.slug}`} className="block group">
                            <div className="relative rounded-3xl overflow-hidden border border-matte-gold/20 aspect-[21/9] md:aspect-[2.5/1]">
                                {/* Background Image/Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black via-charcoal/80 to-transparent z-10"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-matte-gold/10 to-purple-900/20 z-0"></div>

                                <div className="absolute inset-0 z-20 p-8 md:p-16 flex flex-col justify-center max-w-4xl">
                                    <div className="mb-4">
                                        <span className="bg-matte-gold text-charcoal px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                            {featuredNews.category} ویژه
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight font-nastaliq group-hover:text-matte-gold transition-colors">
                                        {featuredNews.title}
                                    </h2>
                                    <p className="text-gray-300 text-lg md:text-xl line-clamp-2 md:line-clamp-3 mb-8 pl-8 border-r-2 border-matte-gold/50">
                                        {featuredNews.summary}
                                    </p>
                                    <span className="flex items-center text-matte-gold font-bold">
                                        مطالعه کامل بیانیه و اسلایدها <span className="mr-2 text-xl">←</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {['all', 'بیانیه', 'خبر', 'تحلیل', 'فوری'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat as Category | 'all')}
                            className={`px-6 py-2 rounded-full border transition-all duration-300 ${filter === cat
                                ? 'bg-matte-gold text-charcoal border-matte-gold font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                                : 'bg-transparent text-gray-400 border-white/10 hover:border-matte-gold/50 hover:text-white'
                                }`}
                        >
                            {cat === 'all' ? 'همه مطالب' : cat}
                        </button>
                    ))}
                </div>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNews.map((news, index) => (
                        <NewsCard key={news.id} news={news} index={index} />
                    ))}
                </div>

                {filteredNews.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        مطلبی در این دسته‌بندی یافت نشد.
                    </div>
                )}
            </div>
        </main>
    )
}
