'use client'

import React from 'react'
import Image from 'next/image'

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-charcoal z-[9999] flex flex-col items-center justify-center">
            {/* Logo Container */}
            <div className="relative w-32 h-32 mb-8 animate-pulse">
                <Image
                    src="/logo.jpg"
                    alt="Loading..."
                    fill
                    className="object-cover rounded-full border-4 border-matte-gold/30"
                />
                {/* Spinning Ring */}
                <div className="absolute inset-[-10px] rounded-full border-t-2 border-r-2 border-matte-gold/60 animate-spin"></div>
            </div>

            <div className="flex flex-col items-center gap-2">
                <span className="text-matte-gold font-bold text-xl animate-pulse">
                    ...در حال بارگذاری
                </span>
                <span className="text-white/40 text-xs tracking-widest">
                    LION & SUN OPPOSITION
                </span>
            </div>
        </div>
    )
}
