'use client'

import { useState, useEffect } from 'react'
import * as openpgp from 'openpgp'
import { motion } from 'framer-motion'

export default function VolunteerForm() {
    const [formData, setFormData] = useState({
        specialty: 'برنامه‌نویسی / IT',
        availability: 'تمام وقت',
        contact: '',
        description: ''
    })
    const [status, setStatus] = useState<'idle' | 'encrypting' | 'success' | 'error'>('idle')
    const [progressLog, setProgressLog] = useState<string[]>([])
    const [publicKey, setPublicKey] = useState<string | null>(null)

    useEffect(() => {
        fetch('/encryption_key.pub')
            .then(res => res.text())
            .then(key => setPublicKey(key))
            .catch(err => console.error("Could not load public key", err))
    }, [])

    const log = (msg: string) => setProgressLog(prev => [...prev, msg])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!publicKey) {
            alert('خطا: کلید رمزنگاری عمومی یافت نشد.')
            return
        }

        setStatus('encrypting')
        setProgressLog([])

        try {
            log('> Initializing Volunteer Secure Protocol...')

            const plainText = `
                --- NEW VOLUNTEER APPLICATION ---
                Specialty: ${formData.specialty}
                Availability: ${formData.availability}
                Secure Contact: ${formData.contact}
                Description: ${formData.description}
                Timestamp: ${new Date().toISOString()}
            `.trim()

            log('> Reading Public Key...')
            const parsedPublicKey = await openpgp.readKey({ armoredKey: publicKey })

            log('> Encrypting Application Data...')
            const encryptedMessage = await openpgp.encrypt({
                message: await openpgp.createMessage({ text: plainText }),
                encryptionKeys: parsedPublicKey
            })

            log('> Sending to Secure Gateway...')

            const res = await fetch('/api/secure-contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ encryptedMessage })
            })

            if (res.ok) {
                log('> Application Secured & Sent.')
                setStatus('success')
            } else {
                throw new Error('API Transmission Failed')
            }

        } catch (error) {
            console.error(error)
            setStatus('error')
            alert('خطا در ارسال. لطفا دوباره تلاش کنید.')
        }
    }

    if (status === 'success') {
        return (
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-w-2xl mx-auto text-center py-20 bg-white/5 rounded-2xl border border-blue-500/30">
                <div className="w-24 h-24 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500 mb-6">
                    <span className="text-4xl">🤝</span>
                </div>
                <h2 className="text-2xl font-bold text-blue-400 mb-4">درود بر شما هموطن</h2>
                <p className="opacity-80 max-w-md mx-auto mb-8 leading-relaxed">
                    پیام اعلام آمادگی شما بصورت رمزنگاری شده دریافت شد.
                    <br />
                    تیم امنیت ما پس از بررسی رزومه و تایید هویت، از طریق راه ارتباطی امنی که مشخص کردید با شما تماس خواهند گرفت.
                </p>
                <button
                    onClick={() => { setStatus('idle'); setFormData({ ...formData, contact: '', description: '' }) }}
                    className="text-sm text-blue-400 hover:text-white underline"
                >
                    ارسال فرم جدید
                </button>
            </motion.div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
                <div className="w-16 h-16 mx-auto bg-blue-900/20 rounded-full flex items-center justify-center border border-blue-500/30 mb-4">
                    <span className="text-3xl">🤝</span>
                </div>
                <h2 className="text-3xl font-bold mb-2">ارتش ملی (Volunteer)</h2>
                <p className="opacity-70">
                    به شبکه متخصصین اپوزیسیون بپیوندید. ما به مهارت‌های شما نیاز داریم.
                    <br />
                    <span className="text-blue-400 text-sm">(اطلاعات این فرم با استاندارد PGP رمزنگاری می‌شود)</span>
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <label className="block text-sm font-bold mb-2 text-blue-300">تخصص اصلی</label>
                        <select
                            value={formData.specialty}
                            onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-blue-500 transition-colors"
                        >
                            <option>برنامه‌نویسی / IT</option>
                            <option>ترجمه / تولید محتوا</option>
                            <option>گرافیک / تدوین</option>
                            <option>حقوق / وکالت</option>
                            <option>عملیات میدانی</option>
                            <option>پزشکی / امداد</option>
                        </select>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                        <label className="block text-sm font-bold mb-2 text-blue-300">میزان وقت‌گذاری</label>
                        <select
                            value={formData.availability}
                            onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-blue-500 transition-colors"
                        >
                            <option>تمام وقت</option>
                            <option>پاره وقت (چند ساعت در هفته)</option>
                            <option>پروژه‌ای</option>
                        </select>
                    </div>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-blue-500/30 transition-colors">
                    <label className="block text-sm font-bold mb-2 text-blue-300">راه ارتباطی امن</label>
                    <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="آیدی تلگرام، سیگنال یا ایمیل امن (ProtonMail)"
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-blue-500 transition-colors ltr"
                    />
                    <p className="text-xs opacity-50 mt-2 text-right">
                        * هرگز از شماره تلفن ایران استفاده نکنید.
                    </p>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <label className="block text-sm font-bold mb-2 text-blue-300">رزومه یا توضیحات</label>
                    <textarea
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:border-blue-500 transition-colors"
                        placeholder="به طور خلاصه از تجربیات خود بنویسید..."
                    ></textarea>
                </div>

                {status === 'encrypting' ? (
                    <div className="bg-black/50 p-4 rounded-xl border border-blue-500/30 font-mono text-xs">
                        <div className="flex items-center gap-2 mb-3 text-blue-400">
                            <span className="animate-spin">⟳</span>
                            <strong>SECURE HANDSHAKE IN PROGRESS...</strong>
                        </div>
                        <div className="space-y-1 text-blue-300/80">
                            {progressLog.map((log, i) => (
                                <div key={i}>{log}</div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-l from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
                    >
                        🔒 رمزنگاری و ثبت اعلام آمادگی
                    </button>
                )}
            </form>
        </div>
    )
}
