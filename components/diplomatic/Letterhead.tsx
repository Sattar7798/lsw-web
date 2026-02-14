'use client'
import React from 'react'

export default function Letterhead({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative group perspective-1000">
            {/* Stacking Effect (Pages underneath) */}
            <div className="absolute inset-0 bg-white/90 translate-y-2 translate-x-2 rounded-sm shadow-md z-0"></div>
            <div className="absolute inset-0 bg-white/95 translate-y-1 translate-x-1 rounded-sm shadow-md z-0"></div>

            {/* Main Paper */}
            <div className="relative z-10 bg-[#fdfbf7] text-black p-12 md:p-16 shadow-2xl overflow-hidden min-h-[800px] border border-gray-200 mx-auto max-w-4xl rounded-sm transition-transform duration-500 ease-out hover:-translate-y-1 hover:shadow-3xl">

                {/* Paper Texture Overlay */}
                <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none select-none mix-blend-multiply"></div>

                {/* Gold Foil Border Frame */}
                <div className="absolute inset-4 border-2 border-[#c5a059]/20 pointer-events-none"></div>
                <div className="absolute inset-5 border border-[#c5a059]/10 pointer-events-none"></div>

                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
                    <img src="/logo.jpg" alt="Watermark" className="w-[500px] grayscale contrast-150" />
                </div>

                {/* Header */}
                <header className="relative z-20 flex flex-col items-center mb-16 border-b border-[#c5a059] pb-8">
                    <div className="w-24 h-24 mb-6 relative">
                        <img src="/logo.jpg" alt="Official Seal" className="w-full h-full object-contain drop-shadow-md" />
                    </div>

                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold font-serif tracking-widest text-gray-900 uppercase">
                            Transition Council of Iran
                        </h2>
                        <h3 className="text-sm text-[#c5a059] font-bold tracking-[0.3em] uppercase">
                            Official Communiqué
                        </h3>
                    </div>

                    <div className="absolute right-0 top-0 hidden md:block text-right">
                        <div className="text-[10px] text-gray-400 font-mono uppercase tracking-widest leading-loose">
                            Ref: IR-DIP-2026-X<br />
                            Class: UNCLASSIFIED<br />
                            Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>
                </header>

                {/* Content Body */}
                <article className="relative z-20 font-serif leading-loose text-gray-800 text-lg text-justify px-4 md:px-8 tracking-wide space-y-6">
                    {children}
                </article>

                {/* Footer */}
                <footer className="absolute bottom-0 left-0 right-0 p-12">
                    <div className="flex justify-between items-end">
                        <div className="text-center">
                            <div className="w-32 h-16 relative mb-2 opacity-80">
                                {/* Simulated Signature */}
                                <svg viewBox="0 0 200 100" className="w-full h-full text-blue-900" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20,50 Q50,20 80,50 T150,50" />
                                </svg>
                            </div>
                            <div className="border-t border-gray-300 w-48 mx-auto -mt-4 mb-2"></div>
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-600">Secretary of Foreign Affairs</p>
                        </div>

                        <div className="text-right">
                            <div className="w-20 h-20 border-4 border-[#c5a059]/30 rounded-full flex items-center justify-center p-1 rotate-12 opacity-80 mix-blend-multiply">
                                <div className="w-full h-full border border-[#c5a059] rounded-full flex items-center justify-center text-[8px] text-[#c5a059] font-bold uppercase tracking-tighter text-center leading-tight">
                                    Official<br />Seal
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-[9px] text-gray-400 font-mono uppercase tracking-[0.2em] border-t border-gray-100 pt-4">
                        Lion & Sun Opposition • Global Diplomatic Network • Secure Transmission
                    </div>
                </footer>
            </div>
        </div>
    )
}
