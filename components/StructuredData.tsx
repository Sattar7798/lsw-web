export default function StructuredData({
    type = 'Organization'
}: {
    type?: 'Organization' | 'WebSite' | 'ContactPage'
}) {
    const baseUrl = 'https://yourdomain.com'

    const organizationData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'اپوزیسیون شیر و خورشید',
        alternateName: 'Lion and Sun Opposition',
        url: baseUrl,
        logo: `${baseUrl}/logo.jpg`,
        description: 'وبسایت رسمی اپوزیسیون شیر و خورشید - نماد مبارزه برای ایران آزاد، مستقل و متحد',
        sameAs: [
            'https://t.me/SamanthaIrani2',
            'https://twitter.com/YourTwitterHandle',
            'https://instagram.com/YourInstagramHandle',
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Public Relations',
            availableLanguage: ['fa', 'en', 'ar'],
        },
    }

    const websiteData = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'اپوزیسیون شیر و خورشید',
        url: baseUrl,
        description: 'وبسایت رسمی اپوزیسیون شیر و خورشید',
        inLanguage: 'fa',
        potentialAction: {
            '@type': 'SearchAction',
            target: `${baseUrl}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
        },
    }

    const contactPageData = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'تماس با ما',
        url: `${baseUrl}/contact`,
        description: 'برای تماس با اپوزیسیون شیر و خورشید از این فرم استفاده کنید',
    }

    let structuredData
    if (type === 'Organization') {
        structuredData = organizationData
    } else if (type === 'WebSite') {
        structuredData = websiteData
    } else if (type === 'ContactPage') {
        structuredData = contactPageData
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData),
            }}
        />
    )
}
