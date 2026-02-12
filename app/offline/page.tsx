'use client'

import Link from 'next/link'

export default function OfflinePage() {
    return (
        <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 text-center">
            <div className="max-w-md">
                <div className="w-24 h-24 bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-red-500/50 animate-pulse">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.89 5.26a8.35 8.35 0 014.28 1.14M6.1 7.1A8.25 8.25 0 003 12c0 1.25.28 2.43.79 3.49M7.06 17.5a16.63 16.63 0 008.38-2.67M20.21 16.9a8.25 8.25 0 00.79-4.9c-.31-1.3-.87-2.5-1.62-3.54" />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold font-nastaliq text-slate-100 mb-4">وضعیت سکوت رادیویی</h1>
                <p className="text-slate-400 mb-8 leading-relaxed">
                    اتصال شما به شبکه جهانی قطع شده است.
                    <br />
                    شما در حال مشاهده نسخه آفلاین هستید. اسناد ذخیره شده قابل دسترسی هستند.
                </p>

                <div className="space-y-3">
                    <button
                        onClick={() => window.location.reload()}
                        className="block w-full py-3 px-4 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                        تلاش مجدد
                    </button>
                    <Link href="/documents" className="block w-full py-3 px-4 bg-yellow-600/20 text-yellow-500 border border-yellow-600/30 rounded-lg hover:bg-yellow-600/30 transition-colors">
                        مرور اسناد ذخیره شده
                    </Link>
                </div>
            </div>
        </main>
    )
}
