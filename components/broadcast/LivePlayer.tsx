'use client'
import React from 'react'

export default function LivePlayer() {
    return (
        <div className="relative aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
            <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded animate-pulse z-10 flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                LIVE
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-gray-900 pointer-events-none">
                {/* Placeholder for iframe */}
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-white/20 border-t-red-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400 text-sm">در حال برقراری ارتباط با استودیو...</p>
                </div>
            </div>

            {/* Simulated Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                <h2 className="text-2xl font-bold text-white mb-2">پوشش زنده: اخبار شامگاهی</h2>
                <p className="text-gray-300 text-sm">با اجرای سیما شهرکی | بررسی تحولات اخیر بازار ارز</p>
            </div>
        </div>
    )
}
