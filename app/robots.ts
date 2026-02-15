import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/secure/', '/api/', '/admin/'],
        },
        sitemap: 'https://lionandsunopposition.com/sitemap.xml',
    }
}
