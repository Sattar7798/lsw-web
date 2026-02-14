'use client'

import { motion } from 'framer-motion'

export default function PrivacyPage() {
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
                        سیاست‌نامه جامع حفظ حریم خصوصی
                    </h1>
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-matte-gold to-transparent mx-auto"></div>
                    <p className="mt-6 text-gray-400 text-sm">آخرین به‌روزرسانی: ۲۴ بهمن ۲۶۰۴</p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto space-y-12 text-justify leading-loose text-gray-300 font-light"
                >
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <p className="mb-4">
                            این سند حقوقی، چارچوب کلی و اصول حاکم بر جمع‌آوری، پردازش و حفاظت از داده‌های کاربران در پلتفرم «اپوزیسیون شیر و خورشید» را تبیین می‌کند. ما متعهد به رعایت بالاترین استانداردهای بین‌المللی حفاظت از داده‌ها (از جمله اصول GDPR) و اصول امنیتی سایبری هستیم.
                        </p>
                    </div>

                    <section>
                        <h2 className="text-2xl font-bold text-matte-gold mb-6 border-b border-white/10 pb-2">ماده ۱: تعاریف و کلیات</h2>
                        <ul className="list-disc list-inside space-y-4 marker:text-matte-gold pr-4">
                            <li><strong>پلتفرم:</strong> وب‌سایت و کلیه سرویس‌های وابسته به اپوزیسیون شیر و خورشید.</li>
                            <li><strong>کاربر:</strong> هر شخص حقیقی که از خدمات پلتفرم استفاده می‌کند.</li>
                            <li><strong>داده‌های شخصی:</strong> هرگونه اطلاعاتی که به طور مستقیم یا غیرمستقیم بتواند منجر به شناسایی کاربر شود.</li>
                            <li><strong>رمزنگاری نامتقارن (PGP):</strong> روشی پیشرفته برای ایمن‌سازی ارتباطات که در آن تنها گیرنده نهایی قادر به رمزگشایی پیام است.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-matte-gold mb-6 border-b border-white/10 pb-2">ماده ۲: اصول جمع‌آوری داده‌ها</h2>
                        <p className="mb-4">
                            ما بر اصل «کمینه‌سازی داده‌ها» (Data Minimization) پایبند هستیم. جمع‌آوری اطلاعات تنها در حد ضرورت فنی و قانونی صورت می‌گیرد.
                        </p>
                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                            <div className="bg-charcoal-light p-6 rounded-xl border border-white/5">
                                <h3 className="text-white font-bold mb-2">الف) اطلاعات داوطلبانه</h3>
                                <p className="text-sm text-gray-400">اطلاعاتی نظیر آدرس ایمیل که کاربر با رضایت کامل جهت عضویت در خبرنامه یا ارسال گزارش ارائه می‌دهد. این اطلاعات مشمول حفاظت شدید امنیتی هستند.</p>
                            </div>
                            <div className="bg-charcoal-light p-6 rounded-xl border border-white/5">
                                <h3 className="text-white font-bold mb-2">ب) داده‌های فنی (Log Data)</h3>
                                <p className="text-sm text-gray-400">سرورهای ما به طور خودکار لاگ‌های استانداردی (شامل نوع مرورگر، زمان درخواست) را ذخیره می‌کنند اما آدرس IP کاربران در سیستم‌های رأی‌گیری و گزارش‌دهی ناشناس‌سازی (Anonymized) می‌شود.</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-matte-gold mb-6 border-b border-white/10 pb-2">ماده ۳: امنیت و رمزنگاری</h2>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <span className="text-matte-gold font-bold">۳.۱.</span>
                                <p>تمامی ترافیک وب‌سایت از طریق پروتکل امن SSL/TLS (HTTPS) رمزگذاری می‌شود.</p>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-matte-gold font-bold">۳.۲.</span>
                                <p>برای ارسال گزارش‌های حساس و افشاگری‌ها، از پروتکل رمزنگاری PGP استفاده می‌شود. این بدان معناست که حتی مدیران سرور نیز بدون داشتن کلید خصوصی فیزیکی، قادر به خواندن محتوای پیام‌ها نیستند.</p>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-matte-gold font-bold">۳.۳.</span>
                                <p>پایگاه‌داده‌های مربوط به کاربران در محیطی ایزوله و پشت فایروال‌های پیشرفته نگهداری می‌شوند و دسترسی به آن‌ها محدود به پرسنل ارشد امنیتی است.</p>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-matte-gold mb-6 border-b border-white/10 pb-2">ماده ۴: حقوق کاربران</h2>
                        <p className="mb-4">کاربران بر اساس قوانین بین‌المللی حقوق بشر و حریم خصوصی، حقوق زیر را دارا هستند:</p>
                        <ul className="list-disc list-inside space-y-2 marker:text-matte-gold pr-4">
                            <li><strong>حق دسترسی:</strong> کاربر حق دارد بداند چه اطلاعاتی از او ذخیره شده است.</li>
                            <li><strong>حق فراموشی:</strong> کاربر می‌تواند درخواست حذف کامل اطلاعات خود (مانند ایمیل) را از پایگاه داده ما داشته باشد.</li>
                            <li><strong>حق اعتراض:</strong> کاربر می‌تواند نسبت به نحوه پردازش داده‌های خود اعتراض کند.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-matte-gold mb-6 border-b border-white/10 pb-2">ماده ۵: عدم افشای اطلاعات به شخص ثالث</h2>
                        <p>
                            ما هرگز، تحت هیچ شرایطی، اطلاعات کاربران خود را به هیچ دولت، سازمان اطلاعاتی، نهاد تبلیغاتی یا شخص ثالثی نمی‌فروشیم و واگذار نمی‌کنیم. تنها استثنا، دستور مستقیم قضایی از سوی یک دادگاه صالح بین‌المللی (مانند دیوان لاهه) است که آن هم با سخت‌گیرانه‌ترین بررسی‌های حقوقی همراه خواهد بود.
                        </p>
                    </section>

                    <div className="mt-12 p-6 border-t border-matte-gold/20 text-center">
                        <p className="text-sm text-gray-500">
                            این سند تحت قوانین بین‌المللی و اصول منشور حقوق بشر سازمان ملل متحد تفسیر می‌شود.
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
