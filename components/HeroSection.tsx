'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function HeroSection() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const { scrollY } = useScroll()

    // Parallax effects
    const yText = useTransform(scrollY, [0, 500], [0, 200])
    const yLogo = useTransform(scrollY, [0, 500], [0, -100])
    const opacityHero = useTransform(scrollY, [0, 500], [1, 0])

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(err => console.log('Video autoplay failed:', err))
        }
        setIsLoaded(true)
    }, [])

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                {/* Video Background */}
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover scale-105"
                >
                    <source src="/background-video.MP4" type="video/mp4" />
                </video>

                {/* Cinematic Overlay - Radial Vignette */}
                <div className="absolute inset-0 bg-radial-vignette opacity-90 z-10"></div>

                {/* Noise Texture */}
                <div className="absolute inset-0 bg-noise opacity-[0.03] z-20 pointer-events-none"></div>

                {/* Massive Rotating Watermark */}
                <motion.div
                    initial={{ opacity: 0, rotate: 0 }}
                    animate={{
                        opacity: isLoaded ? 0.05 : 0,
                        rotate: 360
                    }}
                    transition={{
                        opacity: { duration: 2 },
                        rotate: { duration: 120, repeat: Infinity, ease: "linear" }
                    }}
                    style={{ y: yLogo }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] z-10 pointer-events-none grayscale sepia brightness-50 contrast-150"
                >
                    <Image
                        src="/logo.jpg"
                        alt="Watermark"
                        fill
                        className="object-contain opacity-50"
                    />
                </motion.div>
            </div>

            {/* Main Content */}
            <motion.div
                style={{ y: yText, opacity: opacityHero }}
                className="relative z-30 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center min-h-screen pt-20"
            >
                {/* Hero Card Container */}
                <div className="relative p-8 md:p-12 rounded-3xl border border-white/10 bg-charcoal/30 backdrop-blur-md shadow-2xl max-w-4xl text-center overflow-hidden group">

                    {/* Glossy Reflection Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none"></div>
                    <div className="absolute -inset-[100%] bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 group-hover:animate-shine transition-all duration-1000"></div>

                    {/* Main Title */}
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                        animate={{ opacity: isLoaded ? 1 : 0, scale: 1, filter: 'blur(0px)' }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="relative z-10 font-nastaliq text-6xl md:text-8xl lg:text-9xl mb-4 leading-normal md:leading-relaxed"
                    >
                        <span className="bg-gradient-to-b from-amber-200 via-matte-gold to-amber-700 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(212,175,55,0.5)]">
                            اپوزیسیون شیر و خورشید
                        </span>
                    </motion.h1>

                    {/* Divider */}
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: isLoaded ? "60%" : 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                        className="h-px bg-gradient-to-r from-transparent via-matte-gold to-transparent mx-auto mb-8"
                    />

                    {/* Quote Section */}
                    <div className="relative mb-12 space-y-4">
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
                            transition={{ delay: 1, duration: 0.8 }}
                            className="text-xl md:text-3xl text-gray-200 font-light leading-loose tracking-wide"
                        >
                            «ایران سرزمین ما، میراث نیاکان ما و آینده فرزندان ماست.»
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isLoaded ? 1 : 0 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                            className="text-matte-gold font-bold text-lg md:text-xl tracking-wider uppercase"
                        >
                            — رهبر اپوزیسیون
                        </motion.p>
                    </div>

                    {/* Action Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isLoaded ? 1 : 0, y: 0 }}
                        transition={{ delay: 1.8, duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl mx-auto"
                    >
                        {/* Primary Action */}
                        <Link href="/leader" className="col-span-1 md:col-span-2 lg:col-span-1 group relative overflow-hidden rounded-xl bg-gradient-to-b from-matte-gold to-amber-600 p-[1px] shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all duration-300">
                            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-0 group-hover:opacity-30" />
                            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-charcoal/20 backdrop-blur-sm px-8 py-4 text-xl font-bold text-white transition-all group-hover:bg-transparent">
                                <span className="relative flex items-center gap-2">
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    آشنایی با رهبر
                                </span>
                            </span>
                        </Link>

                        {/* Secondary Actions */}
                        <Link href="/iran-map" className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-white transition-all hover:bg-white/10 hover:border-matte-gold/50 hover:scale-105 active:scale-95">
                            <div className="relative z-10 flex items-center gap-3">
                                <span className="text-xl">🚩</span>
                                <span className="font-bold">شبکه شیر و خورشید</span>
                            </div>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine" />
                        </Link>

                        <Link href="/vision" className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-white transition-all hover:bg-white/10 hover:border-matte-gold/50 hover:scale-105 active:scale-95">
                            <div className="flex items-center justify-center gap-2 font-bold text-lg">
                                <svg className="w-5 h-5 text-matte-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                چشم‌انداز
                            </div>
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 3, duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
                >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    )
}
