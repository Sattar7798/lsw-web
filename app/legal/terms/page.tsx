'use client'

import { motion } from 'framer-motion'

export default function TermsPage() {
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
                        شرایط و ضوابط استفاده از خدمات
                    </h1>
                    <div className="w-32 h-1 bg-gradient-to-r from-transparent via-matte-gold to-transparent mx-auto"></div>
                    <p className="mt-6 text-gray-400 text-sm">نسخه ۱.۰ - لازم‌الاجرا از تاریخ انتشار</p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-4xl mx-auto space-y-12 text-justify leading-loose text-gray-300 font-light"
                >
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
                        <h2 className="text-2xl font-bold text-matte-gold mb-4">توافق‌نامه الزام‌آور</h2>
                        <p>
                            کاربر گرامی، استفاده شما از وب‌سایت «اپوزیسیون شیر و خورشید» به منزله مطالعه دقیق، درک کامل و پذیرش بی قید و شرط تمامی مفاد این توافق‌نامه است. در صورت عدم موافقت با هر یک از بندهای زیر، لطفاً از ادامه استفاده از خدمات این پلتفرم خودداری نمایید.
                        </p>
                    </div>

                    <section>
                        <h2 className="text-2xl font-bold text-matte-gold mb-6 border-b border-white/10 pb-2">ماده ۱: اهلیت و صلاحیت کاربر</h2>
                        <p>
                            استفاده از این پلتفرم برای تمامی افراد با رعایت قوانین بین‌المللی آزاد است. کاربر تعهد می‌نماید که از این پلتفرم جهت سازماندهی فعالیت‌های مدنی مسالمت‌آمیز استفاده نموده و از هرگونه اقدامی که ناقض حقوق بشر یا قوانین جزایی بین‌المللی باشد، پرهیز کند.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-matte-gold mb-6 border-b border-white/10 pb-2">ماده ۲: مالکیت معنوی (Intellectual Property)</h2>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <span className="text-matte-gold font-bold">۲.۱.</span>
                                <p><strong>نشان‌های ملی:</strong> نماد شیر و خورشید و پرچم سه رنگ ایران، میراث ملی ایرانیان است و متعلق به هیچ گروه یا فرد خاصی نیست. با این حال، گرافیک‌های اختصاصی، طراحی‌های رابط کاربری (UI)، کدها و محتوای متنی تولید شده در این وب‌سایت، تحت مالکیت معنوی اپوزیسیون بوده و کپی‌برداری تجاری از آن‌ها بدون مجوز کتبی ممنوع است.</p>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-matte-gold font-bold">۲.۲.</span>
                                <p><strong>حق نشر:</strong> بازنشر محتوای این سایت در راستای اهداف جنبش و آگاهی‌رسانی، با ذکر منبع بلامانع و حتی توصیه می‌شود.</p>
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-matte-gold mb-6 border-b border-white/10 pb-2">ماده ۳: رفتار ممنوعه (Prohibited Conduct)</h2>
                        <p className="mb-4">ارتکاب اعمال زیر منجر به تعلیق دسترسی کاربر و پیگرد قانونی خواهد شد:</p>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                "ترویج خشونت مسلحانه، تروریسم یا نفرت‌پراکنی نژادی/مذهبی.",
                                "تلاش برای نفوذ (Hacking)، مهندسی معکوس یا ایجاد اختلال در سرورها (DDoS).",
                                "انتشار اطلاعات خصوصی سایر کاربران (Doxing).",
                                "استفاده از هویت‌های جعلی جهت فریب افکار عمومی."
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-2 bg-charcoal-light p-4 rounded-lg border border-white/5">
                                    <span className="text-red-500">⛔</span>
                                    <span className="text-sm">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-matte-gold mb-6 border-b border-white/10 pb-2">ماده ۴: سلب مسئولیت (Disclaimer of Liability)</h2>
                        <p>
                            خدمات این پلتفرم «همان‌گونه که هست» (As Is) ارائه می‌شود. اگرچه ما تمام تلاش خود را برای تضمین امنیت و پایداری سرویس‌ها به کار می‌بریم، اما هیچ‌گونه ضمانت صریح یا ضمنی در خصوص عدم قطعی موقت، خطاهای نرم‌افزاری یا حملات سایبری پیچیده ارائه نمی‌دهیم. اپوزیسیون هیچ‌گونه مسئولیتی در قبال اقدامات مستقل کاربران در فضای حقیقی خارج از چارچوب دستورالعمل‌های رسمی ندارد.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-matte-gold mb-6 border-b border-white/10 pb-2">ماده ۵: حل اختلاف و قانون حاکم</h2>
                        <p>
                            در صورت بروز هرگونه اختلاف، طرفین تلاش خواهند کرد موضوع را از طریق داوری مرضی‌الطرفین حل و فصل نمایند. اصول حاکم بر این توافق‌نامه، اعلامیه جهانی حقوق بشر و میثاق بین‌المللی حقوق مدنی و سیاسی است.
                        </p>
                    </section>

                    <div className="mt-12 bg-gradient-to-r from-matte-gold/10 to-transparent p-6 rounded-xl border-r-4 border-matte-gold">
                        <p className="text-white font-bold mb-2">تغییرات در شرایط</p>
                        <p className="text-sm text-gray-400">اپوزیسیون حق دارد در هر زمان و بنا به صلاحدید، مفاد این توافق‌نامه را به‌روزرسانی کند. ادامه استفاده شما از خدمات به منزله پذیرش تغییرات است.</p>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
