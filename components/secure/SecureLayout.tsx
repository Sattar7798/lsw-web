'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface SecureLayoutProps {
    children: React.ReactNode
}

export default function SecureLayout({ children }: SecureLayoutProps) {
    const [secureMode, setSecureMode] = useState(false)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    return (
        <div className={`min-h-screen transition-colors duration-700 ${secureMode ? 'bg-black text-green-500 font-mono' : 'bg-charcoal text-white font-sans'}`}>
            {/* Background Animations (Standard Mode) */}
            {!secureMode && (
                <>
                    <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none fixed"></div>
                    <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-charcoal via-[#0a0a0a] to-black -z-10"></div>
                </>
            )}

            {/* Background animations (Secure Mode) */}
            {secureMode && (
                <div className="fixed inset-0 pointer-events-none opacity-20 z-0 overflow-hidden">
                    <div className="absolute top-0 -left-1/4 w-[150%] h-[1px] bg-green-500/50 animate-[scanline_3s_linear_infinite]"></div>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] opacity-10 h-full w-full">
                        {Array.from({ length: 100 }).map((_, i) => (
                            <div key={i} className="border-[0.5px] border-green-900/30"></div>
                        ))}
                    </div>
                </div>
            )}

            {/* Secure Header */}
            <div className={`fixed top-0 w-full z-50 border-b transition-colors duration-500 ${secureMode ? 'bg-black border-green-900' : 'bg-charcoal/80 backdrop-blur-md border-white/10'}`}>
                <div className="container-custom h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="hover:opacity-70 transition-opacity">
                            {secureMode ? '< بازگشت' : '← بازگشت به صفحه اصلی'}
                        </Link>
                        <div className={`h-4 w-[1px] ${secureMode ? 'bg-green-800' : 'bg-white/20'}`}></div>
                        <span className={`text-sm tracking-widest uppercase ${secureMode ? 'text-green-500 font-bold' : 'text-gray-400'}`}>
                            {secureMode ? 'SECURE_CHANNEL_ESTABLISHED // ENCRYPTED_V3' : 'کانال ارتباطی امن'}
                        </span>
                    </div>

                    <button
                        onClick={() => setSecureMode(!secureMode)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${secureMode
                                ? 'bg-green-900/20 border-green-500 text-green-500 hover:bg-green-500/10'
                                : 'bg-white/5 border-white/10 text-gray-300 hover:border-matte-gold/50 hover:text-white'
                            }`}
                    >
                        <div className={`w-2 h-2 rounded-full ${secureMode ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
                        {secureMode ? 'حالت امن فعال' : 'فعال‌سازی حالت امن'}
                    </button>
                </div>
            </div>

            {/* Content Wrapper */}
            <main className="pt-24 pb-20 container-custom relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={secureMode ? 'secure' : 'standard'}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.4 }}
                    >
                        {children}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    )
}
