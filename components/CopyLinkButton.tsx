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
            className={`flex items-center gap-2 border px-4 py-2.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-sm group ${copied
                ? 'bg-green-500/10 text-green-400 border-green-500/30'
                : 'bg-white/5 hover:bg-white/10 text-white border-white/10 hover:border-white/20 shadow-lg hover:shadow-white/5'
                }`}
        >
            {copied ? (
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
            ) : (
                <svg className="w-5 h-5 fill-current opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
                    <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                </svg>
            )}
            <span className="font-medium">{copied ? 'کپی شد' : 'کپی لینک'}</span>
        </button>
    )
}
