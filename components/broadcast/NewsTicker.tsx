'use client'

import { motion } from 'framer-motion'
import { breakingNewsData } from '@/data/broadcast'

export default function NewsTicker() {
    return (
        <div className="bg-[#b91c1c] text-white overflow-hidden py-3 flex items-center relative z-20 border-b border-white/10 shadow-lg">
            <div className="bg-[#991b1b] px-4 py-1 text-xs font-bold absolute right-0 top-0 bottom-0 flex items-center z-10 shadow-xl">
                <span className="animate-pulse mr-2 w-2 h-2 bg-white rounded-full"></span>
                خبر فوری
            </div>

            <div className="flex whitespace-nowrap overflow-hidden w-full mask-linear-fade">
                <motion.div
                    className="flex gap-16 px-4"
                    animate={{ x: [0, -1000] }}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: "linear"
                    }}
                >
                    {[...breakingNewsData, ...breakingNewsData, ...breakingNewsData].map((news, index) => (
                        <span key={index} className="text-sm font-medium flex items-center text-white/90">
                            <span className="text-[#fbbf24] mx-2 text-xs">◆</span>
                            {news}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
