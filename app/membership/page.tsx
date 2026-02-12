'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import LionSunID from '@/components/membership/LionSunID'

const PROVINCES = [
    'Tehran', 'Fars', 'Isfahan', 'Khorasan', 'Azerbaijan', 'Kurdistan', 'Khuzestan', 'Gilan', 'Mazandaran', 'Other/Diaspora'
]

const SKILLS = [
    'Activist / Organizer',
    'Tech / Cyber',
    'medical / Aid',
    'Art / Media',
    'Legal / Rights',
    'General Support'
]

export default function MembershipPage() {
    const [step, setStep] = useState<'intro' | 'form' | 'card'>('intro')
    const [formData, setFormData] = useState({
        name: '',
        province: '',
        skills: ''
    })
    const [idData, setIdData] = useState({
        idNumber: '',
        joinDate: ''
    })
    const [isGenerating, setIsGenerating] = useState(false)

    // Generate deterministic ID on client side
    const generateID = () => {
        setIsGenerating(true)
        setTimeout(() => {
            const randomBody = Math.floor(Math.random() * 900000) + 100000
            const timestamp = Date.now().toString().slice(-4)
            setIdData({
                idNumber: `IRO-${timestamp}-${randomBody}`,
                joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
            })
            setStep('card')
            setIsGenerating(false)
        }, 2000)
    }

    return (
        <main className="min-h-screen bg-slate-900 text-white relative overflow-hidden flex items-center justify-center p-6">

            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/80 via-slate-900/50 to-black/80 pointer-events-none"></div>

            <div className="max-w-xl w-full relative z-10">

                {/* Intro Step */}
                {step === 'intro' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-800/50 backdrop-blur-md border border-slate-700 p-8 rounded-2xl text-center shadow-2xl"
                    >
                        <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-yellow-500/30">
                            <span className="text-4xl">🦁</span>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent mb-4">
                            ثبت‌نام شهروندی
                        </h1>
                        <p className="text-slate-300 mb-8 leading-relaxed">
                            به سامانه امن ثبت‌نام شهروندی خوش آمدید.
                            <br />
                            <span className="text-yellow-500 font-bold block mt-4 text-sm bg-yellow-500/10 py-2 rounded">
                                ⚠️ هشدار امنیتی: هیچ اطلاعاتی در سرور ذخیره نمی‌شود.
                            </span>
                        </p>
                        <button
                            onClick={() => setStep('form')}
                            className="w-full py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold rounded-xl hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all"
                        >
                            شروع فرآیند امن
                        </button>
                    </motion.div>
                )}

                {/* Form Step */}
                {step === 'form' && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-slate-800/80 backdrop-blur-md border border-slate-700 p-8 rounded-2xl shadow-2xl"
                    >
                        <h2 className="text-xl font-bold text-yellow-500 mb-6 text-center">مشخصات کارت شهروندی</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">نام یا نام مستعار (انگلیسی)</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Kaveh Ahangar"
                                    className="w-full bg-slate-900/50 border border-slate-600 p-3 rounded-lg focus:border-yellow-500 outline-none transition-colors text-left"
                                    dir="ltr"
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1">استان / موقعیت</label>
                                    <select
                                        className="w-full bg-slate-900/50 border border-slate-600 p-3 rounded-lg focus:border-yellow-500 outline-none text-sm"
                                        onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                                        dir="ltr"
                                    >
                                        <option value="">Select...</option>
                                        {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1">حوزه فعالیت</label>
                                    <select
                                        className="w-full bg-slate-900/50 border border-slate-600 p-3 rounded-lg focus:border-yellow-500 outline-none text-sm"
                                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                                        dir="ltr"
                                    >
                                        <option value="">Select...</option>
                                        {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                            </div>

                            <button
                                onClick={generateID}
                                disabled={!formData.name || !formData.province || isGenerating}
                                className="w-full py-4 mt-6 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all relative overflow-hidden"
                            >
                                {isGenerating ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        در حال رمزنگاری...
                                    </span>
                                ) : (
                                    'صدور کارت شهروندی'
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Card Step */}
                {step === 'card' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center gap-8"
                    >
                        <div className="relative group perspective-1000">
                            <LionSunID
                                name={formData.name}
                                province={formData.province}
                                skills={formData.skills}
                                idNumber={idData.idNumber}
                                joinDate={idData.joinDate}
                            />
                        </div>

                        <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-xl text-center max-w-sm">
                            <p className="text-green-400 text-sm font-bold mb-1">✓ کارت صادر شد</p>
                            <p className="text-slate-400 text-xs">
                                این کارت تنها در مرورگر شما موجود است. لطفاً برای ذخیره آن، اسکرین‌شات بگیرید.
                            </p>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={async () => {
                                    const cardElement = document.getElementById('lion-sun-id-card')
                                    if (cardElement) {
                                        try {
                                            const html2canvas = (await import('html2canvas')).default
                                            const canvas = await html2canvas(cardElement, {
                                                scale: 2, // Higher resolution
                                                backgroundColor: null, // Transparent background if needed, or stick to CSS
                                                logging: false,
                                                useCORS: true // For images
                                            })
                                            const link = document.createElement('a')
                                            link.download = `LionSun-ID-${idData.idNumber}.png`
                                            link.href = canvas.toDataURL('image/png')
                                            link.click()
                                        } catch (err) {
                                            console.error('Download failed:', err)
                                            alert('خطا در دانلود کارت. لطفا دوباره تلاش کنید.')
                                        }
                                    }
                                }}
                                className="px-6 py-2 bg-[#d4af37] text-black font-bold rounded-full hover:bg-yellow-500 shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all flex items-center gap-2"
                            >
                                <span>📥</span> دانلود تصویر اصلی
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </main>
    )
}
