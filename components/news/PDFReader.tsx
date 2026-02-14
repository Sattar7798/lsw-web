'use client'

import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { motion, AnimatePresence } from 'framer-motion'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Set worker to CDN (Matching the API version 4.4.168 reported by the error)
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs`

interface PDFReaderProps {
    file: string;
}

export default function PDFReader({ file }: PDFReaderProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
    const [scale, setScale] = useState(1.0);
    const [loading, setLoading] = useState(true);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setLoading(false);
    }

    const changePage = (offset: number) => {
        setDirection(offset);
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    const previousPage = () => changePage(-1);
    const nextPage = () => changePage(1);

    const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 2.0));
    const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.6));

    return (
        <div className="flex flex-col items-center w-full relative">

            {/* Viewer Frame - "Royal Gallery" Look */}
            <div className="relative w-full rounded-none md:rounded-xl overflow-hidden shadow-2xl bg-[#0a0a0a] min-h-[700px] flex flex-col items-center">

                {/* Ambient Backlight Glow - Subtle Gold */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-matte-gold/10 blur-[100px] pointer-events-none"></div>

                {/* Main Content Area */}
                <div className="relative w-full flex justify-center py-12 md:py-16 overflow-hidden">

                    {/* Dark Velvet Texture */}
                    <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'radial-gradient(circle at center, #1a1a1a 0%, #050505 100%)' }}></div>
                    <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>

                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="flex flex-col items-center w-full relative z-10"
                        loading={
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                <div className="w-12 h-12 border-2 border-matte-gold/30 border-t-matte-gold rounded-full animate-spin"></div>
                                <div className="text-matte-gold/60 font-serif tracking-widest text-xs uppercase">Loading Decree...</div>
                            </div>
                        }
                        error={
                            <div className="p-8 text-center text-red-400 bg-red-900/10 rounded-lg border border-red-500/20 backdrop-blur-sm">
                                <p className="font-bold mb-2">ACCESS ERROR</p>
                                <p className="text-sm opacity-70">Document could not be verified.</p>
                            </div>
                        }
                    >
                        <AnimatePresence mode="wait" initial={false} custom={direction}>
                            <motion.div
                                key={pageNumber}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.6 },
                                    opacity: { duration: 0.4 }
                                }}
                                className="relative group"
                            >
                                {/* Document Shadow & Glow */}
                                <div className="absolute inset-0 bg-black/40 blur-xl translate-y-4 -z-10"></div>

                                <Page
                                    pageNumber={pageNumber}
                                    scale={scale}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                    className="!bg-white shadow-[0_0_0_1px_rgba(255,255,255,0.05)]" // Very subtle border
                                    width={Math.min(600, typeof window !== 'undefined' ? window.innerWidth - 40 : 600)}
                                    loading={
                                        <div className="h-[800px] w-[600px] bg-white/5 animate-pulse rounded-sm"></div>
                                    }
                                />
                            </motion.div>
                        </AnimatePresence>
                    </Document>
                </div>

                {/* Bottom Floating Crystal Control Dock */}
                <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-30">
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 flex items-center gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all hover:bg-white/10 hover:border-white/20 hover:scale-105">

                        {/* Page Navigation */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={previousPage}
                                disabled={pageNumber <= 1}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 disabled:opacity-20 transition-all text-white/70 hover:text-white"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" /></svg>
                            </button>

                            <div className="font-serif text-sm tracking-widest text-white/90 w-16 text-center select-none border-x border-white/10 px-2">
                                <span className="text-matte-gold">{pageNumber}</span>
                                <span className="text-white/30 mx-1">/</span>
                                <span className="text-white/50">{numPages || '-'}</span>
                            </div>

                            <button
                                onClick={nextPage}
                                disabled={pageNumber >= (numPages || 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 disabled:opacity-20 transition-all text-white/70 hover:text-white"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" /></svg>
                            </button>
                        </div>

                        {/* Zoom Controls */}
                        <div className="flex items-center gap-1 pl-4 border-l border-white/10">
                            <button onClick={zoomOut} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all text-white/60 hover:text-white">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" /></svg>
                            </button>
                            <button onClick={zoomIn} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-all text-white/60 hover:text-white">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    )
}

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 50 : -50, // Subtle slide (50px instead of 500px)
        opacity: 0,
        zIndex: 0,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 50 : -50, // Slide out the other way
        opacity: 0,
    })
};
