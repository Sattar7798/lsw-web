'use client'
import { useState } from 'react'

export function CopyLinkButton() {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            onClick={handleCopy}
            className={`flex items-center gap-2 border px-6 py-3 rounded-xl transition-all active:scale-95 ${copied
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                }`}
        >
            <span className="text-lg">{copied ? '✓' : '🔗'}</span>
            <span className="font-bold">{copied ? 'کپی شد' : 'کپی لینک'}</span>
        </button>
    )
}
