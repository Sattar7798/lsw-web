'use client'

import HeroSection from '@/components/HeroSection'
import ManifestoSection from '@/components/ManifestoSection'
import Footer from '@/components/Footer'
import StructuredData from '@/components/StructuredData'

export default function Home() {
    return (
        <main className="relative">
            {/* Structured Data for SEO */}
            <StructuredData type="WebSite" />
            <StructuredData type="Organization" />

            {/* Hero Section با ویدیو بکگراند */}
            <HeroSection />

            {/* Manifesto / Vision Section */}
            <ManifestoSection />

            {/* Footer */}
            <Footer />
        </main>
    )
}
