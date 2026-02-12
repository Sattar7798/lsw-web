'use client'

import ResistanceNetwork from '@/components/ResistanceNetwork'
import Link from 'next/link'

export default function IranMapPage() {
    return (
        <main className="w-full h-screen bg-[#0a0a0a] relative overflow-hidden flex flex-col items-center justify-center">

            {/* The Network Visualization */}
            <div className="absolute inset-0 z-0">
                <ResistanceNetwork />
            </div>

            {/* Overlay UI - Back Button */}
            <div className="absolute top-6 right-6 z-50">
                <Link
                    href="/"
                    className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-[#d4af37]/30 px-5 py-2.5 rounded-full text-white/80 hover:text-[#d4af37] hover:border-[#d4af37] transition-all duration-300 group"
                >
                    <span className="text-sm font-bold font-vazir">بازگشت به ستاد فرماندهی</span>
                    <svg className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>

        </main>
    )
}
