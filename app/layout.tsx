import type { Metadata, Viewport } from 'next'
import JsonLd from '@/components/JsonLd'
import './globals.css'
import NavigationMenu from '@/components/NavigationMenu'
import ReCaptchaProvider from '@/components/ReCaptchaProvider'
import ClientProviders from '@/components/ClientProviders'

import { Vazirmatn, Lalezar } from 'next/font/google'

const vazirmatn = Vazirmatn({
    subsets: ['arabic'],
    display: 'swap',
    variable: '--font-vazirmatn',
})

const lalezar = Lalezar({
    weight: '400',
    subsets: ['arabic'],
    display: 'swap',
    variable: '--font-lalezar',
})

export const viewport: Viewport = {
    themeColor: '#0a0a0a',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
}

export const metadata: Metadata = {
    metadataBase: new URL('https://lionandsunopposition.com'),
    title: {
        default: 'اپوزیسیون شیر و خورشید | نماد مبارزه برای ایران آزاد',
        template: '%s | اپوزیسیون شیر و خورشید'
    },
    description: 'وبسایت رسمی اپوزیسیون شیر و خورشید - نماد مبارزه برای ایران آزاد، مستقل و متحد. پیام ما برای تحول دموکراتیک و حفظ هویت ملی ایران',
    keywords: ['ایران', 'اپوزیسیون', 'شیر و خورشید', 'آزادی', 'دموکراسی', 'حقوق بشر', 'تحول', 'Lion and Sun', 'Iran Opposition', 'سکولاریسم', 'تمامیت ارضی'],
    authors: [{ name: 'اپوزیسیون شیر و خورشید', url: 'https://lionandsunopposition.com' }],
    creator: 'اپوزیسیون شیر و خورشید',
    publisher: 'اپوزیسیون شیر و خورشید',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'fa_IR',
        url: 'https://lionandsunopposition.com',
        siteName: 'اپوزیسیون شیر و خورشید',
        title: 'اپوزیسیون شیر و خورشید',
        description: 'نماد مبارزه برای ایران آزاد، مستقل و متحد',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'شیر و خورشید - نماد ملی',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'اپوزیسیون شیر و خورشید',
        description: 'نماد مبارزه برای ایران آزاد، مستقل و متحد',
        images: ['/twitter-image.jpg'], // Make sure to add this image later or reuse logo
        creator: '@SamanthaIrani2',
    },
    alternates: {
        canonical: 'https://lionandsunopposition.com',
    },
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: 'شیر و خورشید',
    },
    formatDetection: {
        telephone: false,
    },
}

import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'
import { SafeModeProvider } from '@/components/SafeModeProvider'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fa" dir="rtl" className={`${vazirmatn.variable} ${lalezar.variable}`}>
            <body className="font-sans antialiased">
                <JsonLd />
                <ServiceWorkerRegister />
                <SafeModeProvider>
                    <ClientProviders>
                        <ReCaptchaProvider>
                            <NavigationMenu />
                            <div className="pt-16">
                                {children}
                            </div>
                        </ReCaptchaProvider>
                    </ClientProviders>
                </SafeModeProvider>
            </body>
        </html>
    )
}
