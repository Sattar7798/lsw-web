import { MetadataRoute } from 'next'
import { newsData } from '@/data/news'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://lionandsun.com'

    // Static Routes
    const routes = [
        '',
        '/leader',
        '/cabinet',
        '/library',
        '/diplomatic',
        '/citizenship',
        '/news',
        '/contact',
        '/vision',
        '/legal/privacy',
        '/legal/terms',
        '/legal/cookies',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }))

    // Dynamic News Routes
    const newsRoutes = newsData.map((post) => ({
        url: `${baseUrl}/news/${post.slug}`,
        lastModified: new Date(), // Using current date as a placeholder since date format in newsData is Persian
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [...routes, ...newsRoutes]
}
