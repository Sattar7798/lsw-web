import { notFound } from 'next/navigation'
import { newsData } from '@/data/news'
import NewsArticleContent from '@/components/NewsArticleContent'

interface Props {
    params: {
        slug: string
    }
}

export const runtime = 'edge';

export default function NewsArticlePage({ params }: Props) {
    const news = newsData.find((item) => item.slug === params.slug)

    if (!news) {
        notFound()
    }

    const relatedNews = newsData.filter(i => i.id !== news.id)

    return <NewsArticleContent news={news} relatedNews={relatedNews} />
}
