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
                        <div className="w-48 h-48 mx-auto relative group">
                            <Image
                                src="/logo.jpg"
                                alt="هویت ملی"
                                fill
                                className="object-contain scale-100 hover:scale-110 transition-transform duration-700 drop-shadow-2xl"
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

                {/* Party Video Section */}
                <div className="mt-32 mb-20 relative z-10 px-4">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent mb-12"></div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="relative group">
                            {/* Glow Effect */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#c5a059] via-[#8a8175] to-[#c5a059] opacity-10 blur-xl group-hover:opacity-30 transition-opacity duration-1000"></div>

                            <div className="relative rounded-2xl overflow-hidden border border-[#c5a059]/20 bg-black/90 shadow-2xl">
                                {/* Decorative Corners */}
                                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#c5a059]/30 rounded-tl-xl"></div>
                                <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#c5a059]/30 rounded-tr-xl"></div>
                                <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#c5a059]/30 rounded-bl-xl"></div>
                                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#c5a059]/30 rounded-br-xl"></div>

                                <video
                                    src="/hezb.MOV"
                                    controls
                                    className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                                    style={{ boxShadow: 'inset 0 0 50px rgba(0,0,0,0.8)' }}
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </div>

                            <div className="text-center mt-8">
                                <h3 className="text-[#c5a059] font-nastaliq text-3xl drop-shadow-md opacity-80">
                                    ندای حزب ملی
                                </h3>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Footer Decor */}
            </div>
        </main>
    )
}
