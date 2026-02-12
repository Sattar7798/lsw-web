'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface SafeModeContextType {
    isSafeMode: boolean;
    triggerSafeMode: () => void;
    clickCount: number;
    incrementClick: () => void;
}

const SafeModeContext = createContext<SafeModeContextType | undefined>(undefined);

export function SafeModeProvider({ children }: { children: React.ReactNode }) {
    const [isSafeMode, setIsSafeMode] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    // Reset click count after 2 seconds of inactivity
    useEffect(() => {
        if (clickCount > 0 && clickCount < 3) {
            const timer = setTimeout(() => {
                setClickCount(0);
            }, 1000);
            return () => clearTimeout(timer);
        }

        if (clickCount >= 3) {
            triggerSafeMode();
            setClickCount(0);
        }
    }, [clickCount]);

    const triggerSafeMode = () => {
        setIsSafeMode(true);
        // Optional: Change title and favicon immediately
        document.title = 'آموزش آشپزی ایرانی | دستور پخت قرمه سبزی';
        const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = '/favicon.ico'; // Ideally swap this too if possible
        document.getElementsByTagName('head')[0].appendChild(link);
    };

    const incrementClick = () => {
        setClickCount(prev => prev + 1);
    };

    return (
        <SafeModeContext.Provider value={{ isSafeMode, triggerSafeMode, clickCount, incrementClick }}>
            {isSafeMode ? <CookingBlog /> : children}
        </SafeModeContext.Provider>
    );
}

export function useSafeMode() {
    const context = useContext(SafeModeContext);
    if (context === undefined) {
        throw new Error('useSafeMode must be used within a SafeModeProvider');
    }
    return context;
}

// The "Disguise" Component
function CookingBlog() {
    return (
        <div className="min-h-screen bg-[#fdfbf7] text-gray-800 font-sans" dir="rtl">
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-green-700">آشپزخانه ایرانی</h1>
                    <nav className="flex gap-4 text-sm text-gray-600">
                        <span>پیش‌غذا</span>
                        <span>خورشت‌ها</span>
                        <span>کباب‌ها</span>
                        <span>دسر</span>
                    </nav>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-8">
                <article>
                    <h2 className="text-3xl font-bold mb-4 text-gray-900">طرز تهیه قرمه سبزی مجلسی</h2>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <span>زمان پخت: ۴ ساعت</span>
                        <span>•</span>
                        <span>تعداد نفرات: ۶ نفر</span>
                    </div>

                    <div className="bg-gray-200 w-full h-64 rounded-lg mb-8 flex items-center justify-center text-gray-400">
                        [تصویر غذا]
                    </div>

                    <p className="leading-8 text-lg mb-6">
                        قرمه سبزی یکی از محبوب‌ترین غذاهای ایرانی است که عطر و طعم بی‌نظیر آن هوش از سر هر کسی می‌برد.
                        رمز و راز یک قرمه سبزی جاافتاده در سبزی سرخ شده و لیمو عمانی آن است...
                    </p>

                    <h3 className="text-xl font-bold mb-3 mt-8">مواد لازم:</h3>
                    <ul className="list-disc list-inside space-y-2 mb-8">
                        <li>ظرف گوشت گوسفندی: ۵۰۰ گرم</li>
                        <li>سبزی قرمه: ۱ کیلوگرم</li>
                        <li>لوبیا قرمز: ۱ پیمانه</li>
                        <li>لیمو عمانی: ۴ عدد</li>
                        <li>پیاز: ۲ عدد بزرگ</li>
                    </ul>

                    <h3 className="text-xl font-bold mb-3">دستور پخت:</h3>
                    <p className="leading-8 text-lg">
                        ۱. ابتدا پیازها را نگینی خرد کرده و تفت دهید تا طلایی شوند.<br />
                        ۲. گوشت را اضافه کرده و تفت دهید تا تغییر رنگ دهد.<br />
                        ۳. سبزی را که جداگانه حسابی سرخ کرده‌اید به گوشت اضافه کنید...
                    </p>
                </article>
            </main>
        </div>
    );
}
