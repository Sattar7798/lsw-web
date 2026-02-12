'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { NewsItem } from '@/data/news'

interface NewsCardProps {
    news: NewsItem;
    index: number;
}

export default function NewsCard({ news, index }: NewsCardProps) {
    // Map categories to colors
    const categoryColors = {
        'بیانیه': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        'خبر': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        'تحلیل': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        'فوری': 'bg-red-500/20 text-red-300 border-red-500/30 animate-pulse',
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative h-full"
        >
            <Link href={`/news/${news.slug}`} className="block h-full">
                <div className="h-full bg-charcoal/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-matte-gold/50 transition-all duration-500 hover:shadow-2xl hover:shadow-matte-gold/10 flex flex-col">

                    {/* Image Container */}
                    <div className="relative h-48 w-full overflow-hidden">
                        <div className="absolute inset-0 bg-charcoal/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                        {/* Placeholder for image - since we don't have real images yet, use a gradient or fallback */}
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black group-hover:scale-110 transition-transform duration-700 flex items-center justify-center">
                            <span className="text-4xl opacity-20">📰</span>
                        </div>

                        {/* Category Badge */}
                        <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${categoryColors[news.category]}`}>
                            {news.category}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <span>{news.date}</span>
                            <span>{news.author}</span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-matte-gold transition-colors font-nastaliq leading-loose">
                            {news.title}
                        </h3>

                        <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-1 leading-relaxed">
                            {news.summary}
                        </p>

                        <div className="flex items-center text-matte-gold text-sm font-medium mt-auto group/btn">
                            <span>مطالعه کامل</span>
                            <svg
                                className="w-4 h-4 mr-2 transform group-hover/btn:-translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}
