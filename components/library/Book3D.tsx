'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Book } from '@/data/library'
import Image from 'next/image'

interface Book3DProps {
    book: Book;
    onClick?: () => void;
}

export default function Book3D({ book, onClick }: Book3DProps) {
    const handleClick = () => {
        if (book.downloadUrl) {
            const link = document.createElement('a')
            link.href = book.downloadUrl
            link.download = book.title
            link.click()
        }
        if (onClick) onClick()
    }

    return (
        <motion.div
            className="relative w-40 h-60 cursor-pointer group perspective-1000"
            whileHover={{ scale: 1.05, rotateY: -15, z: 50 }}
            onClick={handleClick}
        >
            <div className={`relative w-full h-full transform-style-3d transition-transform duration-500 shadow-2xl rounded-sm ${book.coverColor}`}>
                {/* Cover Image or Color Background */}
                {book.coverImage ? (
                    <div className="absolute inset-0 rounded-sm overflow-hidden z-0">
                        <Image
                            src={book.coverImage}
                            alt={book.title}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : null}

                {/* Spine */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-black/20 z-10 rounded-l-sm border-r border-white/10"></div>

                {/* Decoration (Only if no image, or subtle overlay?) -> Let's keep it minimal if image exists */}
                {!book.coverImage && (
                    <>
                        <div className="absolute inset-2 border border-[#c5a059]/30 rounded-sm"></div>
                        <div className="absolute top-10 left-0 right-0 h-px bg-[#c5a059]/20"></div>
                        <div className="absolute bottom-10 left-0 right-0 h-px bg-[#c5a059]/20"></div>
                    </>
                )}

                {/* Content (Title/Author) - Only show if NO cover image */}
                {!book.coverImage && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-20">
                        <div className="w-12 h-12 mb-4 opacity-80 filter brightness-0 invert sepia saturate-100 hue-rotate-10 contrast-100">
                            🦁
                        </div>
                        <h3 className="text-[#c5a059] font-nastaliq text-xl font-bold mb-2 leading-loose drop-shadow-md">
                            {book.title}
                        </h3>
                        <p className="text-white/60 text-xs font-sans tracking-wider uppercase">
                            {book.author}
                        </p>
                    </div>
                )}

                {/* Pages (Right Side) */}
                <div className="absolute top-1 bottom-1 -right-3 w-3 bg-[#e0dacd] transform rotate-y-90 origin-right border-l border-black/10 background-pages"></div>
            </div>
        </motion.div>
    )
}
