'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cabinetData } from '@/data/cabinet'
import MemberCard from '@/components/cabinet/MemberCard'
import WavingFlag from '@/components/WavingFlag'
import Image from 'next/image'

export default function CabinetPage() {
    return (
        <main className="min-h-screen bg-[#0f0c09] text-[#e0dacd] relative overflow-hidden font-fa">

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none z-0"></div>
            <div className="absolute top-0 w-full h-[600px] bg-gradient-to-b from-black via-transparent to-transparent z-10"></div>

            <div className="container-custom pt-32 pb-20 relative z-20">

                {/* Header Section with Waving Flag Background */}
                <div className="text-center mb-24 relative py-12">

                    {/* Localized Waving Flag Background */}
                    <div className="absolute inset-0 z-0 opacity-30 pointer-events-none overflow-hidden rounded-3xl">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0c09] via-transparent to-[#0f0c09] z-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0c09] via-transparent to-[#0f0c09] z-10"></div>
                        <WavingFlag />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-block mb-6 relative z-10"
                    >
                        <div className="w-32 h-32 mx-auto border-4 border-[#c5a059]/40 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-sm relative shadow-2xl overflow-hidden group transition-all hover:border-[#c5a059] hover:shadow-[0_0_30px_rgba(197,160,89,0.3)]">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#c5a059]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                            <Image
                                src="/logo.jpg"
                                alt="هویت ملی"
                                fill
                                className="object-cover scale-110 hover:scale-125 transition-transform duration-700"
                            />
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-nastaliq text-[#e0dacd] mb-6 drop-shadow-2xl relative z-10"
                    >
                        حزب ملی
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-[#8a8175] max-w-2xl mx-auto font-light tracking-wide leading-relaxed relative z-10"
                    >
                        ساختار اجرایی حزب ملی برای مدیریت دوران گذار.
                        <br />
                        <span className="text-red-900/60 text-sm mt-2 block font-mono tracking-widest uppercase">
                            [ CONFIDENTIAL - LEVEL 4 CLEARANCE ]
                        </span>
                    </motion.p>
                </div>

                {/* Cabinet Members Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {cabinetData.map((member, index) => (
                        <MemberCard key={member.id} member={member} index={index} />
                    ))}
                </div>

                {/* Structure Visualization Placeholder */}
                <div className="mt-32 text-center opacity-40 border-t border-[#3e342a] pt-12">
                    <h3 className="text-2xl font-nastaliq text-[#8a8175] mb-4">نمودار سازمانی دولت انتقالی</h3>
                    <div className="w-full h-64 border-2 border-dashed border-[#3e342a] rounded-lg flex items-center justify-center text-[#3e342a]">
                        [ نمودار در حال تکمیل است ]
                    </div>
                </div>

                {/* Footer Decor */}
                <div className="mt-40 text-center opacity-20">
                    <span className="text-6xl grayscale">🦁</span>
                </div>
            </div>
        </main>
    )
}
