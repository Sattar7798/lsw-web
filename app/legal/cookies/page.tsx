'use client'

import { motion } from 'framer-motion'

export default function CookiesPage() {
    return (
        <main className="min-h-screen bg-charcoal pt-32 pb-20">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-5xl mx-auto text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-gold mb-6">
                        خط‌مشی استفاده از کوکی‌ها و فناوری‌های ردیابی
                    </h1>
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-matte-gold to-transparent mx-auto"></div>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto space-y-12 text-justify leading-loose text-gray-300 font-light"
                >
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <p>
                            این سند به منظور شفاف‌سازی کامل در خصوص نحوه استفاده وب‌سایت «اپوزیسیون شیر و خورشید» از کوکی‌ها (Cookies) و فناوری‌های مشابه تنظیم شده است. ما متعهد به رعایت حریم خصوصی کاربران مطابق با دستورالعمل‌های ePrivacy و GDPR هستیم.
                        </p>
                    </div>

                    <section>
                        <h2 className="text-2xl font-bold text-matte-gold mb-6 border-b border-white/10 pb-2">۱. کوکی چیست و چرا استفاده می‌کنیم؟</h2>
                        <p>
                            کوکی یک فایل متنی کوچک است که توسط مرورگر شما بر روی دستگاهتان ذخیره می‌شود. این فایل‌ها به سرورهای ما اجازه می‌دهند تا مرورگر شما را شناسایی کرده و تجربه‌ای امن‌تر و شخصی‌سازی‌شده ارائه دهند. کوکی‌ها به هیچ وجه بدافزار نیستند و نمی‌توانند به اطلاعات شخصی فایل‌های کامپیوتر شما دسترسی پیدا کنند.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-matte-gold mb-6 border-b border-white/10 pb-2">۲. دسته‌بندی کوکی‌های مورد استفاده</h2>

                        <div className="space-y-6">
                            <div className="bg-charcoal-light p-6 rounded-xl border-l-4 border-green-500">
                                <h3 className="text-lg font-bold text-white mb-2">الف) کوکی‌های اکیداً ضروری (Strictly Necessary)</h3>
                                <p className="text-sm text-gray-400 mb-2">این کوکی‌ها برای عملکرد حیاتی وب‌سایت الزامی هستند و نمی‌توانند غیرفعال شوند. بدون این کوکی‌ها، سرویس‌هایی مانند ورود امن، سبد رأی‌گیری و فرم‌های تماس امن کار نخواهند کرد.</p>
                                <ul className="text-xs text-gray-500 list-disc list-inside">
                                    <li>`session_id`: جهت حفظ نشست کاربری امن.</li>
                                    <li>`csrf_token`: جهت جلوگیری از حملات جعل درخواست (Cross-Site Request Forgery).</li>
                                </ul>
                            </div>

                            <div className="bg-charcoal-light p-6 rounded-xl border-l-4 border-blue-500">
                                <h3 className="text-lg font-bold text-white mb-2">ب) کوکی‌های عملکردی (Functional)</h3>
                                <p className="text-sm text-gray-400">این کوکی‌ها به وب‌سایت اجازه می‌دهند تا تنظیمات انتخابی شما (مانند زبان یا وضعیت نمایش) را به خاطر بسپارد تا تجربه کاربری روان‌تری داشته باشید.</p>
                            </div>

                            <div className="bg-charcoal-light p-6 rounded-xl border-l-4 border-yellow-500">
                                <h3 className="text-lg font-bold text-white mb-2">ج) کوکی‌های تحلیلی (Analytics) - ناشناس</h3>
                                <p className="text-sm text-gray-400">ما ممکن است از کوکی‌های تحلیلی داخلی (بدون اشتراک با گوگل یا فیس‌بوک) برای شمارش بازدیدها و بررسی ترافیک سرور استفاده کنیم. این اطلاعات کاملاً تجمیعی و ناشناس است و برای شناسایی افراد استفاده نمی‌شود.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-matte-gold mb-6 border-b border-white/10 pb-2">۳. مدیریت و کنترل کوکی‌ها</h2>
                        <p className="mb-4">
                            شما حق دارید انتخاب کنید که آیا کوکی‌ها را بپذیرید یا خیر. اکثر مرورگرها به طور پیش‌فرض کوکی‌ها را می‌پذیرند، اما می‌توانید تنظیمات مرورگر خود را تغییر دهید تا کوکی‌ها را رد کند یا هنگام ارسال کوکی به شما هشدار دهد.
                        </p>
                        <div className="bg-white/5 p-4 rounded-lg text-sm text-gray-400">
                            <strong>هشدار:</strong> لطفاً توجه داشته باشید که مسدود کردن کامل کوکی‌ها ممکن است باعث شود سیستم‌های احراز هویت و رأی‌گیری امن سایت به درستی عمل نکنند.
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-matte-gold mb-6 border-b border-white/10 pb-2">۴. کوکی‌های شخص ثالث</h2>
                        <p>
                            برخلاف بسیاری از وب‌سایت‌ها، اپوزیسیون شیر و خورشید جهت حفظ امنیت مبارزان، استفاده از کوکی‌های ردیابی شخص ثالث (مانند Google Analytics, Facebook Pixel) را در بخش‌های حساس سایت <strong>تمییز و حذف</strong> کرده است تا هیچ‌گونه ردپایی از کاربران در اختیار غول‌های فناوری قرار نگیرد.
                        </p>
                    </section>
                </motion.div>
            </div>
        </main>
    )
}
