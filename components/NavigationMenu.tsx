'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function NavigationMenu() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const pathname = usePathname()

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const mainLinks = [
        { name: 'خانه', href: '/' },
        { name: 'اخبار', href: '/news' },
        { name: 'کتابخانه اسناد', href: '/documents' },
    ]

    const dropdowns = {
        participation: {
            title: 'مشارکت',
            items: [
                { name: '🗳️ صندوق رأی', href: '/voting' },
                { name: '🆔 عضویت', href: '/membership' },
                { name: '🗺️ نقشه ایران', href: '/iran-map' },
            ]
        },
        movement: {
            title: 'درباره جنبش',
            items: [
                { name: '👑 رهبر', href: '/leader' },
                { name: '👁️ چشم‌انداز', href: '/vision' },
                { name: '⏳ تایم‌لاین', href: '/timeline' },
            ]
        }
    }

    // Hide navigation on secure page
    if (pathname === '/secure') return null

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled
                ? 'bg-[#1c1917]/90 backdrop-blur-xl border-b border-[#d4af37]/30 shadow-2xl py-2'
                : 'bg-transparent py-4'
                }`}
            onMouseLeave={() => setActiveDropdown(null)}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-4 group relative z-50">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#d4af37] to-yellow-600 rounded-full opacity-0 group-hover:opacity-75 blur transition duration-500"></div>
                            <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#d4af37]/50 group-hover:ring-[#d4af37] transition-all duration-500 shadow-lg shadow-[#d4af37]/20">
                                <div
                                    className="w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                    style={{
                                        backgroundImage: 'url(/logo.jpg)',
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#d4af37] via-yellow-200 to-[#d4af37] bg-clip-text text-transparent bg-300% animate-shine font-nastaliq hidden md:block">
                                اپوزیسیون شیر و خورشید
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-2 bg-white/5 backdrop-blur-sm p-1.5 rounded-full border border-white/10 shadow-inner">
                        {/* Direct Links */}
                        {mainLinks.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative px-4 py-2 rounded-full transition-all duration-300 group ${isActive ? 'text-[#d4af37]' : 'text-gray-300 hover:text-white'
                                        }`}
                                >
                                    <span className="relative z-10 font-medium text-sm">
                                        {item.name}
                                    </span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-[#d4af37]/10 border border-[#d4af37]/30 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.2)]"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            )
                        })}

                        {/* Dropdowns */}
                        {Object.entries(dropdowns).map(([key, section]) => (
                            <div
                                key={key}
                                className="relative group"
                                onMouseEnter={() => setActiveDropdown(key)}
                            >
                                <button
                                    className={`flex items-center gap-1 px-4 py-2 rounded-full text-gray-300 hover:text-white transition-colors text-sm font-medium ${activeDropdown === key ? 'text-white bg-white/5' : ''
                                        }`}
                                >
                                    {section.title}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === key ? 'rotate-180' : ''}`}>
                                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {activeDropdown === key && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full mt-2 w-48 bg-[#1c1917]/95 backdrop-blur-xl border border-[#d4af37]/20 rounded-xl shadow-2xl overflow-hidden py-2"
                                        >
                                            {section.items.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-[#d4af37]/10 hover:text-[#d4af37] transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}

                        {/* Actions */}
                        <div className="flex items-center gap-2 pr-2 border-r border-white/10">
                            <Link href="/secure" className="px-4 py-2 bg-[#d4af37] text-black text-xs font-bold rounded-full hover:bg-yellow-500 hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                                تماس امن
                            </Link>
                            <Link href="/en" className="text-xs font-bold text-[#d4af37] hover:text-white transition-colors px-2">
                                EN
                            </Link>
                        </div>

                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden relative z-50 p-2 text-[#d4af37] hover:text-white transition-colors"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <motion.span
                                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                className="w-full h-0.5 bg-current rounded-full origin-center transition-transform"
                            />
                            <motion.span
                                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                className="w-full h-0.5 bg-current rounded-full transition-opacity"
                            />
                            <motion.span
                                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                className="w-full h-0.5 bg-current rounded-full origin-center transition-transform"
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-[#1c1917] border-l border-[#d4af37]/20 z-50 md:hidden shadow-2xl overflow-y-auto"
                        >
                            <div className="flex flex-col min-h-full">
                                <div className="p-6 pt-20 space-y-6">

                                    {/* Mobile Direct Links */}
                                    <div className="space-y-1">
                                        {mainLinks.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${pathname === item.href
                                                        ? 'bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20'
                                                        : 'text-gray-300 hover:bg-white/5'
                                                    }`}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="h-px bg-white/10 mx-2"></div>

                                    {/* Mobile Sections */}
                                    {Object.entries(dropdowns).map(([key, section]) => (
                                        <div key={key}>
                                            <h3 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider mb-2 px-4 opacity-70">
                                                {section.title}
                                            </h3>
                                            <div className="space-y-1">
                                                {section.items.map((item) => (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        onClick={() => setIsOpen(false)}
                                                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${pathname === item.href
                                                                ? 'bg-[#d4af37]/10 text-[#d4af37]'
                                                                : 'text-gray-400 hover:text-gray-200'
                                                            }`}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="pt-6">
                                        <Link
                                            href="/secure"
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full text-center py-3 bg-[#d4af37] text-black font-bold rounded-xl shadow-lg shadow-[#d4af37]/20"
                                        >
                                            تماس امن
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    )
}
