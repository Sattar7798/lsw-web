'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function EnglishPage() {
    return (
        <main className="min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-900 to-slate-800 rounded-full flex items-center justify-center text-white font-serif font-bold text-xl">
                            L
                        </div>
                        <span className="font-serif text-xl font-bold text-slate-900 tracking-tight">Lion & Sun</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                        <Link href="#vision" className="hover:text-blue-900 transition-colors">The Vision</Link>
                        <Link href="#roadmap" className="hover:text-blue-900 transition-colors">Transition Roadmap</Link>
                        <Link href="#leadership" className="hover:text-blue-900 transition-colors">Leadership</Link>
                        <Link href="/" className="px-4 py-2 rounded-full border border-slate-300 hover:bg-slate-100 transition-colors">
                            فارسی (Persian)
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-slate-50">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 skew-x-12 transform origin-top-right"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-widest rounded-sm mb-6">
                            The Secular Alternative
                        </span>
                        <h1 className="font-serif text-5xl lg:text-7xl font-bold text-slate-900 leading-tight mb-8">
                            Stability.<br />
                            Democracy.<br />
                            <span className="text-blue-900">Future.</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed max-w-lg mb-10 font-sans">
                            We represent the roadmap to a controlled, non-violent transition from the current theocracy to a secular parliamentary democracy. A partner for global peace and regional stability.
                        </p>
                        <div className="flex gap-4">
                            <button className="px-8 py-4 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors shadow-lg shadow-blue-900/20">
                                Read the Whitepaper
                            </button>
                            <button className="px-8 py-4 bg-white text-slate-900 border border-slate-300 font-medium rounded-lg hover:bg-slate-50 transition-colors">
                                Contact Press Office
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] bg-slate-200 rounded-2xl overflow-hidden shadow-2xl relative">
                            {/* Placeholder for Diplomatic Image */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-slate-300 to-slate-100 flex items-center justify-center">
                                <span className="text-slate-400 font-serif text-4xl italic">Statesman Visual</span>
                            </div>

                            {/* Overlay Card */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50">
                                <p className="font-serif text-lg text-slate-900 italic mb-2">
                                    "Our mission is not just to oppose, but to propose a viable, stable future for the Iranian nation."
                                </p>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                                    — The Crown Prince
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Strategic Pillars */}
            <section id="vision" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                title: "Secular Governance",
                                desc: "Complete separation of mosque and state, ensuring religious freedom for all while preventing clerical interference in politics."
                            },
                            {
                                title: "Economic Renaissance",
                                desc: "Reintegration into the global market, protection of property rights, and massive infrastructure modernization."
                            },
                            {
                                title: "Regional Stability",
                                desc: "Ending proxy conflicts and establishing peaceful, constructive relations with all neighbors and global powers."
                            }
                        ].map((item, i) => (
                            <div key={i} className="group">
                                <div className="w-12 h-1 bg-blue-900 mb-6 group-hover:w-24 transition-all duration-300"></div>
                                <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Roadmap */}
            <section id="roadmap" className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-serif text-4xl font-bold text-slate-900 mb-4">The Transition Roadmap</h2>
                        <p className="text-slate-600">A calculated, step-by-step approach to regime change that prioritizes public safety and institutional continuity.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Civil Disobedience", desc: "Coordinated strikes and non-violent resistance to paralyze the economic engine of the regime." },
                            { step: "02", title: "Power Transfer", desc: "Interim government formation led by the Transition Council to maintain order." },
                            { step: "03", title: "Constituent Assembly", desc: "Drafting a new secular constitution subject to a national referendum." },
                            { step: "04", title: "Free Elections", desc: "First parliamentary elections observed by the UN to establish the new government." }
                        ].map((phase, i) => (
                            <div key={i} className="relative bg-white p-8 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                <span className="absolute -top-4 left-6 px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded">Phase {phase.step}</span>
                                <h3 className="font-serif text-xl font-bold text-slate-900 mt-4 mb-3">{phase.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{phase.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
