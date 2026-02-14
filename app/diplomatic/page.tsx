'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Letterhead from '@/components/diplomatic/Letterhead'
import StatementCard from '@/components/diplomatic/StatementCard'
import { diplomaticData, embassyContacts } from '@/data/diplomatic'
import Image from 'next/image'

export default function DiplomaticPage() {
    return (
        <main className="min-h-screen bg-charcoal text-white font-serif relative overflow-hidden">
            {/* Background Texture & Effects */}
            <div className="absolute inset-0 bg-noise opacity-[0.05] pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-matte-gold/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

            {/* Header / Navbar Placeholder (if needed, or relies on global nav) */}
            {/* Assuming global nav handles the top, but we add a specific page header */}

            <div className="container-custom pt-32 pb-20 relative z-10">
                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-gold mb-4 uppercase tracking-widest font-cinzel">
                        International Affairs
                    </h1>
                    <div className="flex items-center justify-center gap-4 text-gray-400 text-sm tracking-[0.3em] font-light">
                        <span className="w-12 h-[1px] bg-matte-gold/50"></span>
                        <span>Official Diplomatic Channel</span>
                        <span className="w-12 h-[1px] bg-matte-gold/50"></span>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Main Content Area: Official Letterhead (8 cols) */}
                    <div className="lg:col-span-8 space-y-12">
                        {diplomaticData.length > 0 ? (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-1 h-8 bg-matte-gold"></div>
                                        <h2 className="text-2xl font-bold text-white font-serif">Latest Communiqué</h2>
                                    </div>

                                    {/* The Letterhead Component itself */}
                                    <div className="transform transition-transform hover:scale-[1.01] duration-500">
                                        <Letterhead>
                                            <p className="mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-[#c5a059] first-letter:float-left first-letter:mr-3">
                                                <strong>To the International Community,</strong>
                                            </p>
                                            <p className="mb-6">
                                                The Transition Council of Iran, representing the unified will of the Iranian people, formally declares its commitment to a secular, democratic, and peaceful transition of power. We call upon all free nations to recognize the legitimate aspirations of our citizens.
                                            </p>
                                            <p className="mb-6">
                                                We are establishing direct channels of communication to ensure transparency and cooperation during this critical period of history.
                                            </p>
                                            <p>
                                                state information regarding the continuity of international treaties and obligations will be transmitted via secure diplomatic cables.
                                            </p>
                                        </Letterhead>
                                    </div>
                                </motion.div>

                                <div className="pt-12 border-t border-white/10">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl font-bold text-white font-cinzel">Diplomatic Archives</h3>
                                        <button className="text-xs text-matte-gold border border-matte-gold/30 px-4 py-2 rounded hover:bg-matte-gold/10 transition-colors uppercase tracking-wider">
                                            View Full Archive
                                        </button>
                                    </div>

                                    <div className="grid gap-4">
                                        {diplomaticData.map((doc, index) => (
                                            <StatementCard key={doc.id} statement={doc} index={index} />
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-12 border border-white/5 bg-white/5 rounded-2xl backdrop-blur-sm">
                                <div className="w-20 h-20 mb-6 opacity-20">
                                    <Image src="/logo.jpg" alt="Icon" width={80} height={80} className="grayscale" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-400 mb-2">No Official Statements Released</h3>
                                <p className="text-gray-500 max-w-md">
                                    Official diplomatic communiqués will be published here upon release by the Transition Council.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Contact & Embassies (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">

                        {/* Status Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-black/40 border border-matte-gold/30 p-8 rounded-xl backdrop-blur-md relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <svg className="w-24 h-24 text-matte-gold" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                            </div>

                            <h3 className="text-matte-gold font-bold uppercase tracking-widest mb-4 text-xs">System Status</h3>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-2xl font-bold text-white tracking-wider">OPERATIONAL</span>
                            </div>
                            <p className="text-gray-400 text-xs font-mono border-t border-white/10 pt-4 mt-4">
                                SECURE UPLINK ESTABLISHED<br />
                                ENCRYPTION: AES-256-GCM<br />
                                NODE: TEHRAN-01 (VIRTUAL)
                            </p>
                        </motion.div>

                        {/* Contact List */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm"
                        >
                            <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs border-b border-white/10 pb-4 flex justify-between items-center">
                                <span>Liaison Offices</span>
                                <span className="text-xs text-gray-500">Global</span>
                            </h3>
                            <div className="space-y-6">
                                {embassyContacts.map((contact, i) => (
                                    <div key={i} className="group cursor-pointer hover:bg-white/5 p-3 -mx-3 rounded transition-colors">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-gray-200 group-hover:text-matte-gold transition-colors font-serif text-lg">
                                                {contact.city}
                                            </h4>
                                            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-400 border border-white/5">
                                                {contact.country}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 font-mono">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            {contact.email}
                                        </div>
                                        <div className="flex items-center gap-2 mt-1 text-[10px] text-matte-gold/70 font-mono">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                            PGP: {contact.pbo?.substring(0, 16)}...
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-gradient-to-br from-blue-900/40 to-black border border-blue-500/30 p-6 rounded-xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>
                            <h3 className="text-blue-200 font-bold mb-2 text-sm uppercase tracking-wider">Press Accreditation</h3>
                            <p className="text-blue-100/70 text-sm mb-6 leading-relaxed">
                                Validated journalists and diplomatic corps may request encrypted credentials for official briefings and embargoed materials.
                            </p>
                            <a
                                href="/secure?type=credentials"
                                className="block w-full bg-blue-600/20 border border-blue-500/50 text-blue-200 py-3 rounded text-sm font-bold hover:bg-blue-600/40 hover:border-blue-400 transition-all text-center uppercase tracking-wide"
                            >
                                Request Access
                            </a>
                        </motion.div>

                    </div>
                </div>
            </div>
        </main>
    )
}
