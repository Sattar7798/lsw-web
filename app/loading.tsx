'use client'

import React from 'react'
import Image from 'next/image'

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-charcoal z-[9999] flex flex-col items-center justify-center">
            {/* Logo Container */}
            <div className="relative w-40 h-40 mb-8 animate-pulse">
                <Image
                    src="/logo.jpg"
                    alt="Loading..."
                    fill
                    className="object-contain"
                />
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
