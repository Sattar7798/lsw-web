export interface VideoItem {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string; // YouTube ID or direct link
    duration: string;
    publishDate: string;
    category: 'News' | 'Speech' | 'Documentary' | 'Interview';
    isLive?: boolean;
}

export const broadcastData: VideoItem[] = [
    {
        id: 'live-001',
        title: 'پخش زنده: سخنرانی شاهزاده رضا پهلوی',
        description: 'پوشش مستقیم گردهمایی بزرگ ایرانیان در برلین.',
        thumbnailUrl: '/images/live-placeholder.jpg', // Placeholder
        videoUrl: 'dQw4w9WgXcQ', // Placeholder YouTube ID
        duration: 'LIVE',
        publishDate: 'هم‌اکنون',
        category: 'Speech',
        isLive: true,
    },
    {
        id: 'vid-001',
        title: 'تحلیل هفتگی: فروپاشی اقتصادی رژیم',
        description: 'بررسی شاخص‌های اقتصادی و تورم افسارگسیخته در سه ماهه اخیر.',
        thumbnailUrl: '/images/news-thumb-1.jpg',
        videoUrl: 'videoid1',
        duration: '15:30',
        publishDate: '۱۴۰۳/۱۱/۲۰',
        category: 'News',
    },
    {
        id: 'vid-002',
        title: 'مستند: صدای آبان',
        description: 'روایتی از جان‌باختگان راه آزادی در اعتراضات آبان ۹۸.',
        thumbnailUrl: '/images/doc-thumb-1.jpg',
        videoUrl: 'videoid2',
        duration: '45:00',
        publishDate: '۱۴۰۳/۰۸/۲۴',
        category: 'Documentary',
    },
    {
        id: 'vid-003',
        title: 'گفتگوی ویژه با سخنگوی دولت انتقالی',
        description: 'پاسخ به سوالات درباره فرآیند گذار و امنیت عمومی.',
        thumbnailUrl: '/images/interview-thumb-1.jpg',
        videoUrl: 'videoid3',
        duration: '28:15',
        publishDate: '۱۴۰۳/۱۱/۱۵',
        category: 'Interview',
    },
];

export const breakingNewsData = [
    "فراخوان سراسری برای اعتصابات بازار در بیستم اسفند...",
    "سقوط ارزش ریال به پایین‌ترین حد تاریخی خود رسید.",
    "پیام همبستگی اتحادیه‌های کارگری اروپا با کارگران نفت جنوب.",
    "انتشار اسناد محرمانه فساد در وزارت نیرو توسط گروه هکری.",
];
