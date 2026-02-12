import '../globals.css'
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
    title: 'Lion and Sun - The Secular Alternative',
    description: 'Official platform of the Lion and Sun opposition movement. Advocating for a secular, democratic, and stable Iran.',
}

export default function EnglishLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div lang="en" dir="ltr" className={`${playfair.variable} ${inter.variable} font-sans bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-blue-900`}>
            {children}
        </div>
    )
}
