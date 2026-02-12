'use client'

import { motion } from 'framer-motion'

interface LionSunIDProps {
    name: string;
    province: string;
    idNumber: string;
    joinDate: string;
    skills: string;
}

export default function LionSunID({ name, province, idNumber, joinDate, skills }: LionSunIDProps) {
    return (
        <div id="lion-sun-id-card" className="relative w-[400px] h-[252px] rounded-2xl overflow-hidden shadow-2xl group select-none">

            {/* 1. Background Layer */}
            {/* Deep Matte Black Base */}
            <div className="absolute inset-0 bg-[#0f0f0f]"></div>

            {/* Luxury Texture (Noise/Grain) */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}></div>

            {/* Golden Gradient Sheen (Diagonal) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 via-transparent to-[#d4af37]/10 pointer-events-none"></div>

            {/* 2. Decorative Elements */}
            {/* Guilloche Pattern Suggestion (SVG Curve) */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none overflow-hidden">
                <svg viewBox="0 0 100 100" className="absolute -right-10 -top-20 w-64 h-64 text-[#d4af37] fill-current">
                    <path d="M50,0 C80,0 100,20 100,50 C100,80 80,100 50,100 C20,100 0,80 0,50 C0,20 20,0 50,0 Z M50,5 C25,5 5,25 5,50 C5,75 25,95 50,95 C75,95 95,75 95,50 C95,25 75,5 50,5 Z" />
                </svg>
            </div>

            {/* 3. Golden Border Frame */}
            <div className="absolute inset-3 border-2 border-[#d4af37]/40 rounded-xl pointer-events-none"></div>
            <div className="absolute inset-[13px] border border-[#d4af37]/20 rounded-lg pointer-events-none"></div>

            {/* 4. Content Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 w-full h-full">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        {/* Logo */}
                        <div className="relative w-12 h-12 rounded-full border border-[#d4af37]/50 shadow-[0_0_15px_rgba(212,175,55,0.3)] bg-black/50 overflow-hidden">
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: 'url(/logo.jpg)' }}
                            />
                        </div>
                        <div>
                            <h3 className="text-[#fcf6ba] font-bold text-base tracking-wide font-sans leading-none mb-1 shadow-black drop-shadow-md">
                                LION & SUN
                            </h3>
                            <p className="text-[#d4af37] text-[9px] uppercase tracking-[0.25em] font-medium">
                                Resistance ID
                            </p>
                        </div>
                    </div>

                    {/* Chip */}
                    <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-[#e2c168] to-[#8a6e2f] relative shadow-inner border border-[#6b5212]">
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-black/30"></div>
                        <div className="absolute left-1/2 top-0 h-full w-[1px] bg-black/30"></div>
                        <div className="absolute inset-1.5 border border-black/20 rounded-sm"></div>
                    </div>
                </div>

                {/* Data Fields */}
                <div className="flex flex-col gap-4 mt-2 pl-1">
                    <div className="flex gap-8">
                        <div>
                            <p className="text-[#64748b] text-[8px] uppercase tracking-wider mb-0.5">Name</p>
                            <p className="text-white font-bold text-lg font-mono leading-none tracking-tight drop-shadow-md">
                                {name || 'UNKNOWN'}
                            </p>
                        </div>
                        <div>
                            <p className="text-[#64748b] text-[8px] uppercase tracking-wider mb-0.5">Province</p>
                            <p className="text-white font-medium text-sm font-mono leading-none mt-1">
                                {province || '---'}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-[#64748b] text-[8px] uppercase tracking-wider mb-0.5">ID Number</p>
                            <p className="text-[#d4af37] font-mono text-xs tracking-widest shadow-black drop-shadow-sm">
                                {idNumber}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-[#64748b] text-[8px] uppercase tracking-wider mb-0.5">Skill Set</p>
                            <div className="bg-[#d4af37]/10 border border-[#d4af37]/30 px-2 py-1 rounded text-[9px] text-[#d4af37] font-bold">
                                {skills || 'GENERAL'}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* 5. Holographic Overlay */}
            <div
                className="absolute inset-0 z-20 pointer-events-none opacity-40 mix-blend-overlay bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                style={{
                    background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.0) 50%)',
                    transform: 'translateZ(0)',
                }}
            ></div>

            {/* Dynamic Glare on Hover */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent z-30 pointer-events-none"
                initial={{ x: '-100%' }}
                animate={{ x: '200%' }}
                transition={{ repeat: Infinity, duration: 3, ease: 'linear', repeatDelay: 1 }}
            />

        </div>
    )
}
