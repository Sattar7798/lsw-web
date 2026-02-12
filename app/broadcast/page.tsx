'use client'

import React from 'react'
import LivePlayer from '@/components/broadcast/LivePlayer'
import NewsTicker from '@/components/broadcast/NewsTicker'
import VideoGrid from '@/components/broadcast/VideoGrid'

export default function BroadcastPage() {
    return (
        <main className="min-h-screen bg-[#0f0c09] text-white">
            {/* Header / Nav Placeholder (Navbar is fixed) */}
            <div className="pt-20"></div>

            {/* News Ticker (Sticky) */}
            <div className="sticky top-16 z-40">
                <NewsTicker />
            </div>

            <div className="container-custom py-12">

                {/* Header Section */}
                <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-5xl font-nastaliq text-red-600 mb-2 drop-shadow-lg">
                            صدا و سیمای ملی ایران
                        </h1>
                        <p className="text-gray-400 font-light text-lg">
                            صدای بی‌سانسور انقلاب ملی ایران
                        </p>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center gap-2 text-white/50 text-sm">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            وضعیت شبکه: آنلاین
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-8 mb-20">

                    {/* Live Stream Column (2/3 width) */}
                    <div className="lg:col-span-2">
                        <div className="bg-[#1a1510] border border-white/10 rounded-xl p-1 mb-6 shadow-2xl">
                            <LivePlayer />
                        </div>

                        <div className="bg-[#1c1917] p-6 rounded-xl border border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-2">
                                پخش زنده: پوشش ویژه خبری
                            </h2>
                            <p className="text-gray-400 leading-relaxed">
                                هم‌اکنون در حال پخش مستقیم برنامه‌ی خبری شامگاهی با حضور کارشناسان سیاسی و اقتصادی.
                                برای ارسال گزارش‌های مردمی از طریق پیام‌رسان‌های امن اقدام کنید.
                            </p>
                            <div className="mt-4 flex gap-4">
                                <button className="bg-red-700 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-bold transition-colors shadow-lg shadow-red-900/20">
                                    حمایت مالی
                                </button>
                                <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg font-bold transition-colors">
                                    آرشیو برنامه‌ها
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Top Stories (1/3 width) */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-[#c5a059] border-r-4 border-[#c5a059] pr-4">
                            سرخط خبرها
                        </h3>
                        <div className="bg-[#1a1510] rounded-xl border border-white/10 p-4 space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="flex gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0 group cursor-pointer hover:bg-white/5 p-2 rounded transition-colors">
                                    <div className="text-red-500 font-bold text-lg opacity-50 group-hover:opacity-100">
                                        {i.toLocaleString('fa-IR')}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium text-sm mb-1 leading-normal group-hover:text-[#c5a059] transition-colors">
                                            تیتر خبر مهم شماره {i} درباره تحولات اخیر کشور
                                        </h4>
                                        <span className="text-xs text-gray-500">
                                            {10 + i} دقیقه پیش
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social Links */}
                        <div className="bg-[#0f0c09] border border-white/10 rounded-xl p-6 text-center">
                            <p className="text-gray-400 text-sm mb-4">ما را در شبکه‌های اجتماعی دنبال کنید</p>
                            <div className="flex justify-center gap-4 text-2xl">
                                <span className="hover:text-[#c5a059] cursor-pointer transition-colors">𝕏</span>
                                <span className="hover:text-[#c5a059] cursor-pointer transition-colors">📸</span>
                                <span className="hover:text-[#c5a059] cursor-pointer transition-colors">✈️</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Archive Section */}
                <div className="border-t border-white/10 pt-12">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-3xl font-nastaliq text-white">
                            آرشیو برنامه‌ها
                        </h3>
                        <a href="/broadcast/archive" className="text-[#c5a059] hover:text-white text-sm transition-colors flex items-center gap-2">
                            مشاهده همه
                            <span>←</span>
                        </a>
                    </div>

                    <VideoGrid />
                </div>
            </div>
        </main>
    )
}
