'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
    return (
        <main className="min-h-screen bg-charcoal relative flex items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80 z-10 pointer-events-none"></div>

            {/* Animated Spotlights */}
            <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-matte-gold/10 rounded-full blur-[100px]"
            />
            <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, delay: 2 }}
                className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-ruby-red/10 rounded-full blur-[120px]"
            />

            <div className="relative z-20 text-center px-4 max-w-3xl">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-56 h-56 mx-auto mb-8 opacity-50"
                >
                    <Image
                        src="/logo.jpg"
                        alt="Lion and Sun"
                        fill
                        className="object-contain grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </motion.div>

                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent mb-4 font-mono"
                >
                    404
                </motion.h1>

                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-2xl md:text-4xl font-bold text-matte-gold mb-6 font-nastaliq leading-relaxed"
                >
                    این صفحه در تاریخ گم شده است...
                </motion.h2>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-gray-400 text-lg mb-10 leading-relaxed max-w-lg mx-auto"
                >
                    شاید نامی که جستجو کردید تغییر کرده، یا شاید هنوز زمان آشکار شدنش فرا نرسیده است.
                </motion.p>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 bg-matte-gold text-charcoal px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all active:scale-95 group"
                    >
                        <span>بازگشت به خانه</span>
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                    </Link>
                </motion.div>
            </div>
        </main>
    )
}
