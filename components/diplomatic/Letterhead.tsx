'use client'
import React from 'react'

export default function Letterhead({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white text-black p-10 md:p-16 shadow-2xl relative overflow-hidden min-h-[800px] border-8 border-double border-[#d4af37]/40 ring-1 ring-gray-100 mx-auto max-w-4xl">
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                <img src="/logo.jpg" alt="Watermark" className="w-[500px] grayscale" />
            </div>

            {/* Header */}
            <div className="flex justify-between items-center border-b-2 border-[#c5a059] pb-8 mb-12 relative z-10 font-serif">
                <div className="text-left w-1/3">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-[0.2em]">
                        Government in Exile
                    </h2>
                    <p className="text-xs text-[#c5a059] uppercase tracking-widest mt-2 font-semibold">
                        State of Iran
                    </p>
                </div>

                <div className="flex flex-col items-center w-1/3">
                    <div className="w-24 h-24 rounded-full border-4 border-[#c5a059] p-1 shadow-lg mb-2 flex items-center justify-center overflow-hidden">
                        <img src="/logo.jpg" alt="Official Seal" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="text-right w-1/3">
                    <h2 className="text-2xl font-bold text-gray-900 font-nastaliq mb-1">
                        حزب ملی ایران
                    </h2>
                    <p className="text-sm text-[#c5a059] font-nastaliq">
                        شورای عالی گذار
                    </p>
                </div>
            </div>

            {/* Content Body */}
            <div className="relative z-10 font-serif leading-loose text-gray-800 text-lg text-justify px-4 md:px-8 tracking-wide">
                {children}
            </div>

            {/* Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-center items-center">
                <div className="border-t border-[#c5a059]/30 w-full pt-4 flex justify-between text-[10px] text-gray-400 uppercase tracking-widest font-mono">
                    <span>Office of International Affairs</span>
                    <span>• Official Correspondence •</span>
                    <span>Ref: IR-DIP-2026-X</span>
                </div>
            </div>
        </div>
    )
}
