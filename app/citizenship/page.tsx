'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LionSunID from '@/components/membership/LionSunID';
import Link from 'next/link';

const PROVINCES = [
    'تهران', 'فارس', 'اصفهان', 'خراسان رضوی', 'آذربایجان شرقی', 'کردستان', 'خوزستان', 'گیلان', 'مازندران', 'البرز', 'هرمزگان', 'یزد', 'کرمان', 'سیستان و بلوچستان', 'خارج از کشور (دیاسپورا)'
];

export default function CitizenshipPage() {
    const [step, setStep] = useState<'intro' | 'form' | 'generated'>('intro');
    const [formData, setFormData] = useState({ name: '', province: '' });
    const [idData, setIdData] = useState({ idNumber: '', joinDate: '' });
    const [isGenerating, setIsGenerating] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    const generateID = async () => {
        setIsGenerating(true);

        // 1. Register the "Real" ID generation
        try {
            console.log('📊 Sending stats POST request...');
            const response = await fetch('/api/stats', { method: 'POST' });
            const data = await response.json();
            console.log('✅ Stats response:', data);
        } catch (e) {
            console.error('❌ Failed to register stat', e);
        }

        // Simulate "Processing" with a delay
        setTimeout(() => {
            const randomBody = Math.floor(Math.random() * 9000000) + 1000000;
            const timestamp = Date.now().toString().slice(-4);
            setIdData({
                idNumber: `PARS-${timestamp}-${randomBody}`,
                joinDate: new Date().toLocaleDateString('fa-IR')
            });
            setStep('generated');
            setIsGenerating(false);
        }, 2500);
    };

    const downloadCard = async () => {
        if (!cardRef.current) return;
        try {
            const html2canvas = (await import('html2canvas')).default;
            const canvas = await html2canvas(cardRef.current, {
                scale: 3, // High Res for social media
                backgroundColor: null,
                useCORS: true,
                logging: false,
            } as any);
            const link = document.createElement('a');
            link.download = `ParsID-${formData.name.replace(/\s+/g, '_')}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('Download failed', err);
            alert('دانلود انجام نشد. لطفا مجددا تلاش کنید.');
        }
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-4 relative overflow-hidden flex flex-col items-center justify-center font-vazir" dir="rtl">

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

            <AnimatePresence mode="wait">

                {/* 1. INTRO SCREEN */}
                {step === 'intro' && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                        className="max-w-2xl w-full text-center space-y-8 relative z-10"
                    >
                        <div className="w-24 h-24 mx-auto bg-gradient-to-b from-[#d4af37] to-[#8a6e2f] rounded-full p-[1px] shadow-[0_0_50px_rgba(212,175,55,0.3)]">
                            <div className="w-full h-full bg-black rounded-full flex items-center justify-center overflow-hidden">
                                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover opacity-80" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2 font-lalezar">
                                <span className="text-[#d4af37]">هویت دیجیتال</span> پارس
                            </h1>
                            <p className="text-lg text-gray-400 max-w-lg mx-auto leading-relaxed">
                                به ملت دیجیتال ایران بپیوندید. کارت شناسایی رسمی مقاومت خود را دریافت کنید.
                                <br />
                                <span className="text-[#d4af37] font-bold">امن. ناشناس. نماد همبستگی.</span>
                            </p>
                        </div>

                        <button
                            onClick={() => setStep('form')}
                            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black transition-all duration-200 bg-[#d4af37] rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d4af37] focus:ring-offset-gray-900"
                        >
                            <div className="absolute -inset-3 transition-all duration-1000 opacity-30 group-hover:opacity-100 group-hover:duration-200 animate-tilt">
                                <div className="w-full h-full blur-lg bg-gradient-to-r from-[#d4af37] via-yellow-200 to-[#d4af37]"></div>
                            </div>
                            <span className="relative flex items-center gap-3">
                                صدور کارت من
                                <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                            </span>
                        </button>
                    </motion.div>
                )}

                {/* 2. FORM SCREEN */}
                {step === 'form' && (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="max-w-md w-full bg-[#151515] border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10 backdrop-blur-xl"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 font-lalezar">
                            <span className="w-1 h-8 bg-[#d4af37] rounded-full"></span>
                            مشخصات شهروند
                        </h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">نام یا نام مستعار</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="مثال: کاوه آهنگر"
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all placeholder-gray-700"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">استان / منطقه</label>
                                <select
                                    value={formData.province}
                                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] outline-none transition-all appearance-none cursor-pointer"
                                >
                                    <option value="">انتخاب استان...</option>
                                    {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>

                            <button
                                onClick={generateID}
                                disabled={!formData.name || !formData.province || isGenerating}
                                className="w-full py-4 mt-4 bg-gradient-to-r from-[#d4af37] to-[#b38f22] text-black font-bold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#d4af37]/10 flex items-center justify-center gap-2"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                        در حال صدور و رمزنگاری...
                                    </>
                                ) : (
                                    'صدور کارت شناسایی دیجیتال'
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* 3. GENERATED CARD SCREEN */}
                {step === 'generated' && (
                    <motion.div
                        key="generated"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center space-y-8 relative z-10"
                    >
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold text-white font-lalezar">هویت شما تایید شد</h2>
                            <p className="text-green-500 font-mono text-sm flex items-center justify-center gap-2" dir="ltr">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                BLOCKCHAIN VERIFIED MOCKUP
                            </p>
                        </div>

                        {/* Card Preview */}
                        <div className="relative group transition-transform hover:scale-[1.02] duration-500">
                            <div ref={cardRef}>
                                <LionSunID
                                    name={formData.name}
                                    province={formData.province}
                                    idNumber={idData.idNumber}
                                    joinDate={idData.joinDate}
                                    skills="مبارز آزادی"
                                />
                            </div>
                            {/* Reflection effect */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-[#d4af37]/20 to-purple-500/20 rounded-[2rem] blur-xl -z-10 opacity-0 group-hover:opacity-50 transition-opacity duration-700"></div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                            <button
                                onClick={downloadCard}
                                className="flex-1 flex items-center justify-center gap-2 bg-[#d4af37] text-black px-6 py-3 rounded-xl font-bold hover:bg-[#ffe175] transition-colors shadow-[0_0_20px_rgba(212,175,55,0.2)]"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                دانلود نسخه با کیفیت
                            </button>
                            <Link
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent('من هویت دیجیتال پارس خود را دریافت کردم.\n\nبه فرزندان آگاهی ساز و شیر و خورشید بپیوندید.\n\n#پاینده_ایران #ParsID #پرچم_شیر_و_خورشید')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-900 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] border border-white/20"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                اشتراک در X
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    )
}
