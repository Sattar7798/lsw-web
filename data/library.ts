export interface Book {
    id: string;
    title: string;
    author: string;
    publishDate: string;
    coverColor: string;
    category: 'History' | 'Politics' | 'Literature' | 'Philosophy';
    description: string;
    downloadUrl?: string;
    isForbidden?: boolean;
}

export const libraryData: Book[] = [
    {
        id: '1',
        title: 'تاریخ انقلاب مشروطه',
        author: 'احمد کسروی',
        publishDate: '۱۳۱۹',
        coverColor: 'bg-[#8B0000]',
        category: 'History',
        description: 'روایتی دقیق از تلاش‌های مشروطه‌خواهان.',
        isForbidden: true,
    },
    {
        id: '2',
        title: 'غروب بت‌ها',
        author: 'فریدریش نیچه',
        publishDate: '۱۸۸۹',
        coverColor: 'bg-[#2F4F4F]',
        category: 'Philosophy',
        description: 'نقد بت‌های قدیمی و ساختارهای اخلاقی سنتی.',
    },
    {
        id: '3',
        title: 'دو قرن سکوت',
        author: 'عبدالحسین زرین‌کوب',
        publishDate: '۱۳۳۰',
        coverColor: 'bg-[#191970]',
        category: 'History',
        description: 'بررسی تاریخ ایران در دو قرن اول اسلام.',
        isForbidden: true,
    },
    {
        id: '4',
        title: 'بوف کور',
        author: 'صادق هدایت',
        publishDate: '۱۳۱۵',
        coverColor: 'bg-[#000000]',
        category: 'Literature',
        description: 'شاهکار ادبیات سورئال ایران.',
        isForbidden: true,
    },
    {
        id: '5',
        title: 'پاسخ به تاریخ',
        author: 'محمدرضا پهلوی',
        publishDate: '۱۳۵۸',
        coverColor: 'bg-[#DAA520]',
        category: 'Politics',
        description: 'خاطرات و تحلیل‌های آخرین شاه ایران.',
        isForbidden: true,
    },
];
