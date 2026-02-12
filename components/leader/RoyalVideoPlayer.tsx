'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RoyalVideoPlayer() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [showControls, setShowControls] = useState(true)

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
            setProgress(progress)
        }
    }

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (videoRef.current) {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = e.clientX - rect.left
            const width = rect.width
            const percentage = x / width
            videoRef.current.currentTime = percentage * videoRef.current.duration
        }
    }

    return (
        <div
            className="relative w-full max-w-5xl mx-auto my-12 group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            {/* Royal Frame - Outer Glow */}
            <div className="absolute -inset-1 bg-gradient-gold opacity-50 blur-xl rounded-[2.5rem] animate-pulse-gold"></div>

            {/* Royal Frame - Border Structure */}
            <div className="relative p-1 bg-gradient-to-br from-matte-gold via-yellow-200 to-matte-gold rounded-[2rem] shadow-2xl">
                {/* Inner Bevel */}
                <div className="relative bg-charcoal rounded-[1.8rem] overflow-hidden border border-black/50">

                    {/* Video Element */}
                    <video
                        ref={videoRef}
                        src="/aboutleader.MOV"
                        className="w-full aspect-video object-cover cursor-pointer"
                        onClick={togglePlay}
                        onTimeUpdate={handleTimeUpdate}
                        playsInline
                    />

                    {/* Overlay Controls */}
                    <AnimatePresence>
                        {(!isPlaying || showControls) && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8"
                            >
                                {/* Center Play Button (Only when paused) */}
                                {!isPlaying && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <button
                                            onClick={togglePlay}
                                            className="w-20 h-20 md:w-24 md:h-24 bg-matte-gold/20 backdrop-blur-md rounded-full border border-matte-gold flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform hover:bg-matte-gold/30 group/play"
                                        >
                                            <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2 group-hover/play:border-l-matte-gold transition-colors"></div>
                                        </button>
                                    </div>
                                )}

                                {/* Bottom Controls Bar */}
                                <div className="space-y-4">
                                    {/* Progress Bar */}
                                    <div
                                        className="h-1.5 bg-white/20 rounded-full cursor-pointer hover:h-2.5 transition-all group/bar"
                                        onClick={handleProgressClick}
                                    >
                                        <div
                                            className="h-full bg-gradient-gold rounded-full relative"
                                            style={{ width: `${progress}%` }}
                                        >
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover/bar:opacity-100 transition-opacity"></div>
                                        </div>
                                    </div>

                                    {/* Control Buttons */}
                                    <div className="flex items-center justify-between text-white">
                                        <div className="flex items-center gap-6">
                                            <button onClick={togglePlay} className="hover:text-matte-gold transition-colors">
                                                {isPlaying ? (
                                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                                                ) : (
                                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                                )}
                                            </button>
                                            <span className="font-mono text-sm opacity-80 tracking-widest uppercase text-matte-gold">
                                                Leader of the Opposition
                                            </span>
                                        </div>

                                        {/* Decorative Element */}
                                        <div className="hidden md:flex items-center gap-2 opacity-50">
                                            <div className="w-2 h-2 rounded-full bg-matte-gold animate-pulse"></div>
                                            <span className="text-xs tracking-[0.2em] font-light">SECURE BROADCAST</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Decorative Corner Ornaments */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-matte-gold/50 rounded-tl-3xl pointer-events-none"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-matte-gold/50 rounded-br-3xl pointer-events-none"></div>
        </div>
    )
}
