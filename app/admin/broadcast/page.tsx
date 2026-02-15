'use client'

import { useState } from 'react'

export default function BroadcastPage() {
    const [secret, setSecret] = useState('')
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [result, setResult] = useState<any>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setResult(null)

        try {
            const res = await fetch('/api/broadcast', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ secret, subject, content }),
            })

            const data = await res.json()

            if (res.ok) {
                setStatus('success')
                setResult(data)
            } else {
                setStatus('error')
                setResult(data)
            }
        } catch (err) {
            setStatus('error')
            setResult({ error: 'Connection failed' })
        }
    }

    return (
        <div className="min-h-screen bg-charcoal text-white pt-32 px-4 max-w-2xl mx-auto font-sans">
            <h1 className="text-3xl font-nastaliq text-matte-gold mb-8 text-center">ارسال خبرنامه همگانی</h1>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/10">
                <div>
                    <label className="block mb-2 text-sm text-gray-400">کلید امنیتی ادمین (Admin Secret)</label>
                    <input
                        type="password"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                        className="w-full bg-black/50 border border-white/20 rounded px-4 py-2 text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm text-gray-400">موضوع ایمیل (Subject)</label>
                    <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full bg-black/50 border border-white/20 rounded px-4 py-2 text-white"
                        required
                        placeholder="مثلاً: خبر فوری - بیانیه جدید منتشر شد"
                    />
                </div>

                <div>
                    <label className="block mb-2 text-sm text-gray-400">متن ایمیل (HTML Supported)</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        className="w-full bg-black/50 border border-white/20 rounded px-4 py-2 text-white font-mono text-sm"
                        required
                        placeholder="<p>سلام دوستان...</p>"
                    />
                </div>

                <button
                    disabled={status === 'loading'}
                    className="w-full bg-matte-gold text-charcoal font-bold py-3 rounded hover:bg-yellow-500 transition disabled:opacity-50"
                >
                    {status === 'loading' ? 'در حال ارسال...' : 'ارسال به همه اعضا 🚀'}
                </button>
            </form>

            {result && (
                <div className={`mt-8 p-4 rounded border ${status === 'success' ? 'bg-green-900/20 border-green-500' : 'bg-red-900/20 border-red-500'}`}>
                    <pre className="text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    )
}
