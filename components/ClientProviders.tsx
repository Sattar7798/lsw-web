'use client'

import { ThemeProvider } from './ThemeProvider'
import ThemeToggle from './ThemeToggle'

export default function ClientProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            {/* <ThemeToggle /> Removed per user request */}
            {children}
        </ThemeProvider>
    )
}
