'use client'

import { motion } from 'framer-motion'
import PDFReader from '@/components/news/PDFReader'
import Link from 'next/link'

export default function StatementViewerPage() {
    return (
        <main className="min-h-screen bg-charcoal text-white pt-24 pb-20 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none fixed"></div>

            {/* Top Bar */}
            <div className="container-custom relative z-10 mb-12">
                <div className="border-b border-matte-gold/30 pb-8 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-matte-gold text-charcoal px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                                Official Statement
                            </span>
                            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 border-l border-white/10 pl-3 ml-3">
                                <span className="text-matte-gold font-bold text-sm font-nastaliq tracking-wide">
                                    25 بهمن 1404
                                </span>
                                <span className="text-gray-500 text-[10px] font-mono uppercase tracking-widest hidden md:inline">|</span>
                                <span className="text-gray-400 text-xs font-serif tracking-widest">
                                    14 February 2026
                                </span>
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black font-nastaliq text-transparent bg-clip-text bg-gradient-gold leading-relaxed">
                            اولین بیانیه رسمی اپوزیسیون شیر و خورشید
                        </h1>
                    </div>

                    <div className="flex gap-4">
                        <Link
                            href="/firststatement.pdf"
                            target="_blank"
                            download
                            className="bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white px-6 py-2 rounded-lg font-bold transition-all flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>دانلود فایل PDF</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Viewer Content */}
            <div className="container-custom relative z-10 min-h-[800px]">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key="pdf"
                >
                    <div className="border border-white/10 bg-black/20 rounded-xl p-8 md:p-12 backdrop-blur-sm">
                        <PDFReader file="/firststatement.pdf" />
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
