export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'اپوزیسیون شیر و خورشید',
        url: 'https://lionandsun.com',
        logo: 'https://lionandsun.com/logo.jpg',
        sameAs: [
            'https://twitter.com/SamanthaIrani2',
            'https://instagram.com/lionandsunofficial',
            'https://t.me/lionandsunofficial'
        ],
        founder: {
            '@type': 'Person',
            name: 'رهبر اپوزیسیون',
            jobTitle: 'Leader of the Opposition',
            url: 'https://lionandsun.com/leader',
            image: 'https://lionandsun.com/leader.jpg'
        },
        description: 'وبسایت رسمی اپوزیسیون شیر و خورشید - نماد مبارزه برای ایران آزاد، مستقل و متحد.',
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}
