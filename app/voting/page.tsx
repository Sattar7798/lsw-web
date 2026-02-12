'use client'

import { pollsData } from '@/data/polls'
import PollCard from '@/components/voting/PollCard'
import Link from 'next/link'

export default function VotingPage() {
    return (
        <main className="min-h-screen bg-[#1c1917] text-[#e7e5e4] font-sans pb-20 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: 'url("/noise.png")',
            }}></div>
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>

            {/* Header */}
            <header className="relative z-10 pt-16 pb-12 text-center">
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 mb-6 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                    <span className="text-4xl">🗳️</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-nastaliq text-[#d4af37] mb-4 drop-shadow-md">
                    صندوق رأی دیجیتال
                </h1>
                <p className="text-[#a8a29e] max-w-xl mx-auto text-sm md:text-base leading-relaxed">
                    سامانه امن و ناشناس برای تمرین دموکراسی مستقیم.
                    <br />
                    صدای شما، قدرت ماست.
                </p>
            </header>

            {/* Polls Grid */}
            <div className="container-custom relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {pollsData.map(poll => (
                        <PollCard key={poll.id} poll={poll} />
                    ))}
                </div>

                {/* Info Box */}
                <div className="max-w-3xl mx-auto mt-16 bg-white/5 backdrop-blur-sm border border-[#d4af37]/20 rounded-xl p-6 text-center shadow-2xl">
                    <h3 className="font-bold text-[#d4af37] mb-3 font-nastaliq text-xl">شفافیت و امنیت</h3>
                    <p className="text-sm text-[#d6d3d1] leading-relaxed opacity-80">
                        برای جلوگیری از تقلب، سیستم از شناسه مرورگر شما استفاده می‌کند.
                        هیچ اطلاعات هویتی از شما دریافت یا ذخیره نمی‌شود.
                        نتایج به صورت زنده برای همه کاربران یکسان نمایش داده می‌شود.
                    </p>
                </div>

                <div className="text-center mt-12">
                    <Link href="/" className="text-sm text-[#78716c] hover:text-[#d4af37] transition-colors border-b border-dotted border-[#78716c] hover:border-[#d4af37] pb-1">
                        بازگشت به صفحه اصلی
                    </Link>
                </div>
            </div>
        </main>
    )
}
