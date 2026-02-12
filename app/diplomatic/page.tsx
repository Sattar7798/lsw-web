'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Letterhead from '@/components/diplomatic/Letterhead'
import StatementCard from '@/components/diplomatic/StatementCard'
import { diplomaticData, embassyContacts } from '@/data/diplomatic'

export default function DiplomaticPage() {
    return (
        <main className="min-h-screen bg-[#f8f9fa] text-gray-900 font-serif relative">

            {/* Minimalist Header for Official Feeling */}
            <div className="bg-white border-b border-gray-200 py-4 shadow-sm sticky top-0 z-50 relative">
                <div className="container-custom flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                            <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
                        </div>
                        <div className="leading-tight">
                            <h1 className="text-lg font-bold uppercase tracking-widest text-gray-900">Diplomatic Portal</h1>
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Official Commuinications Channel</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-custom py-20 relative z-10">

                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Main Content Area: Official Letterhead */}
                    <div className="lg:col-span-2 space-y-12">
                        {diplomaticData.length > 0 ? (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h2 className="text-3xl font-bold mb-8 text-gray-900 font-serif">Latest Official Statement</h2>
                                    <Letterhead>
                                        <p className="mb-6">
                                            <strong>To the International Community,</strong>
                                        </p>
                                        <p className="mb-6">
                                            [Recent Statement Content Will Appear Here]
                                        </p>
                                    </Letterhead>
                                </motion.div>

                                <div className="pt-12 border-t border-gray-200">
                                    <h3 className="text-2xl font-bold mb-6 text-gray-900">Diplomatic Correspondence Log</h3>
                                    <div className="grid gap-6">
                                        {diplomaticData.map((doc, index) => (
                                            <StatementCard key={doc.id} statement={doc} index={index} />
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-12 border-2 border-dashed border-gray-200 rounded-lg">
                                <span className="text-6xl mb-6 grayscale opacity-20">🦁</span>
                                <h3 className="text-xl font-bold text-gray-400 mb-2">No Official Statements Released</h3>
                                <p className="text-gray-400 max-w-md">
                                    Official diplomatic communiqués will be published here upon release by the Transition Council.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Contact & Embassies */}
                    <div className="lg:col-span-1 space-y-8">

                        {/* Status Card */}
                        <div className="bg-[#1a1510] text-white p-6 rounded shadow-lg text-center">
                            <h3 className="text-[#c5a059] font-bold uppercase tracking-widest mb-2 text-sm">Diplomatic Status</h3>
                            <div className="text-4xl font-bold mb-2">ACTIVE</div>
                            <p className="text-gray-400 text-xs">
                                All channels open and secure.<br />
                                Encrypted link established.
                            </p>
                        </div>

                        {/* Contact List */}
                        <div className="bg-white border border-gray-200 p-6 rounded shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-sm border-b pb-2">
                                Liaison Offices
                            </h3>
                            <div className="space-y-6">
                                {embassyContacts.map((contact, i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <h4 className="font-bold text-gray-900 group-hover:text-[#c5a059] transition-colors">
                                            {contact.city}
                                        </h4>
                                        <p className="text-sm text-gray-500 font-mono mt-1">{contact.email}</p>
                                        <p className="text-xs text-gray-400 font-mono mt-1">{contact.pbo}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-100 p-6 rounded">
                            <h3 className="text-blue-900 font-bold mb-2 text-sm">Press Accreditation</h3>
                            <p className="text-blue-800 text-sm mb-4 leading-relaxed">
                                Journalists and diplomatic corps may request credentials for official briefings.
                            </p>
                            <a
                                href="/secure?type=credentials"
                                className="block w-full bg-blue-900 text-white py-2 rounded text-sm font-bold hover:bg-blue-800 transition-colors text-center"
                            >
                                Request Credentials
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}
