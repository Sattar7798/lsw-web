import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/secure/', '/api/', '/admin/'],
        },
        sitemap: 'https://lionandsun.com/sitemap.xml',
    }
}
