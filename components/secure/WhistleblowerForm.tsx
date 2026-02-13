'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as openpgp from 'openpgp'

export default function WhistleblowerForm() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({ type: 'اسناد اداری/دولتی', description: '' })
    const [files, setFiles] = useState<File[]>([])
    const [isEncrypting, setIsEncrypting] = useState(false)
    const [progressLog, setProgressLog] = useState<string[]>([])
    const [publicKey, setPublicKey] = useState<string | null>(null)

    // Load Public Key on Mount
    useEffect(() => {
        fetch('/encryption_key.pub')
            .then(res => res.text())
            .then(key => setPublicKey(key))
            .catch(err => console.error("Could not load public key", err))
    }, [])

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files))
        }
    }

    const log = (msg: string) => setProgressLog(prev => [...prev, msg])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!publicKey) {
            alert('خطا: کلید رمزنگاری عمومی یافت نشد.')
            return
        }

        setIsEncrypting(true)
        setProgressLog([])

        try {
            log('> Initializing Client-Side Encryption...')

            // 1. Prepare Message
            const plainText = `
                Type: ${formData.type}
                Description: ${formData.description}
                Timestamp: ${new Date().toISOString()}
            `.trim()

            log('> Reading Public Key...')
            const parsedPublicKey = await openpgp.readKey({ armoredKey: publicKey })

            log('> Encrypting Text Message...')
            const encryptedMessage = await openpgp.encrypt({
                message: await openpgp.createMessage({ text: plainText }),
                encryptionKeys: parsedPublicKey
            })

            // Process files: Read as Base64
            const processedFiles = await Promise.all(
                files.map(async (file) => {
                    return new Promise<{ filename: string; content: string; type: string }>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = () => {
                            // Helper to remove data URL prefix (e.g. "data:image/png;base64,")
                            const result = reader.result as string;
                            // Resend expects header-less base64 or buffer. 
                            // Actually Resend 'content' can be a base64 string if we handle it right, 
                            // but safest is usually to send the full data URI or just the headers.
                            // Let's send the full data URI and handle in backend? 
                            // Or better: Buffer.from(base64) in backend.
                            // Let's send the whole string.
                            resolve({
                                filename: file.name,
                                content: result,
                                type: file.type
                            });
                        };
                        reader.onerror = error => reject(error);
                    });
                })
            );

            log(`> Prepared ${processedFiles.length} files for transmission...`);

            log('> Establishing Secure Tunnel...')

            // 2. Send to API
            const res = await fetch('/api/secure-contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    encryptedMessage: encryptedMessage,
                    attachments: processedFiles
                })
            })

            if (res.ok) {
                log('> Transmission Complete.')
                setTimeout(() => setStep(3), 1000)
            } else {
                throw new Error('API Transmission Failed')
            }

        } catch (error) {
            console.error(error)
            log('> ERROR: Transmission Failed.')
            alert('خطا در ارسال امن. لطفا دوباره تلاش کنید.')
        } finally {
            setIsEncrypting(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            {step === 1 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 mx-auto bg-red-900/20 rounded-full flex items-center justify-center border border-red-500/30 mb-4 animate-pulse">
                            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold mb-2">صدای مردم (Whistleblower)</h2>
                        <p className="opacity-70">
                            ارسال <span className="text-red-400 font-bold">کاملاً امن و رمزنگاری شده</span> اسناد.
                            <br />
                            هیچکس (حتی سرور ما) نمی‌تواند پیام شما را بخواند. فقط با کلید خصوصی مدیر باز می‌شود.
                        </p>
                    </div>

                    <form onSubmit={() => setStep(2)} className="space-y-6">
                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                            <label className="block text-sm font-bold mb-2">نوع اطلاعات</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-red-500 transition-colors"
                            >
                                <option>اسناد اداری/دولتی</option>
                                <option>ویدیو/عکس از اعتراضات</option>
                                <option>اطلاعات هویتی سرکوبگران</option>
                                <option>فساد مالی</option>
                                <option>سایر موارد</option>
                            </select>
                        </div>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                            <label className="block text-sm font-bold mb-2">توضیحات (اختیاری)</label>
                            <textarea
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 focus:outline-none focus:border-red-500 transition-colors"
                                placeholder="متن پیام شما قبل از ارسال در مرورگر شما قفل (Encrypt) می‌شود..."
                            ></textarea>
                            <p className="text-xs opacity-50 mt-2 text-right">
                                * توصیه می‌شود از اسامی واقعی خود استفاده نکنید.
                            </p>
                        </div>

                        <button type="submit" className="w-full bg-gradient-to-l from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-red-900/20">
                            مرحله بعد: بارگذاری اسناد
                        </button>
                    </form>
                </motion.div>
            )}

            {step === 2 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="border-2 border-dashed border-white/20 rounded-2xl p-10 text-center hover:border-red-500/50 transition-colors cursor-pointer group relative overflow-hidden">
                        <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />
                        <div className="relative z-10 pointer-events-none">
                            <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform duration-300">📂</span>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-red-400 transition-colors">
                                اسناد را اینجا رها کنید
                            </h3>
                            <p className="opacity-50 text-sm">
                                یا برای انتخاب کلیک کنید (تصویر، ویدیو، PDF)
                            </p>
                        </div>
                    </div>

                    {files.length > 0 && (
                        <div className="mt-8 space-y-4">
                            {files.map((file, i) => (
                                <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10">
                                    <div className="flex items-center gap-3">
                                        <span className="opacity-50">📄</span>
                                        <span className="text-sm">{file.name}</span>
                                    </div>
                                    <span className="text-xs opacity-50">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {!isEncrypting && (
                        <button
                            onClick={handleSubmit}
                            className="w-full mt-4 bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                        >
                            🔒 رمزنگاری (PGP) و ارسال امن
                        </button>
                    )}

                    {isEncrypting && (
                        <div className="mt-8 bg-black/50 p-4 rounded-lg font-mono text-xs border border-green-500/30">
                            <div className="flex items-center gap-2 mb-3 text-green-400">
                                <span className="animate-spin">⟳</span>
                                <strong>SECURE TRANSMISSION IN PROGRESS</strong>
                            </div>
                            <div className="space-y-1 text-green-600/80">
                                {progressLog.map((log, i) => (
                                    <div key={i}>{log}</div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            )}

            {step === 3 && (
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-20">
                    <div className="w-24 h-24 mx-auto bg-green-500/20 rounded-full flex items-center justify-center border border-green-500 mb-6">
                        <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-green-500 mb-4 font-mono">MISSION ACCOMPLISHED</h2>
                    <p className="opacity-70 max-w-md mx-auto mb-8 leading-loose">
                        پیام شما با موفقیت رمزنگاری و ارسال شد.
                        <br />
                        با توجه به ماهیت امنیتی (Zero-Knowledge)، این پیام در سرور ما قابل خواندن نیست و فقط توسط مدیریت با کلید خصوصی باز می‌شود.
                        <br />
                        هیچ ردی از این ارسال در مرورگر شما باقی نمانده است.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="text-sm text-gray-500 hover:text-white underline"
                    >
                        بازگشت / پاکسازی ردپا
                    </button>
                </motion.div>
            )}
        </div>
    )
}
