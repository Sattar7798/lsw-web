export interface Book {
    id: string;
    title: string;
    author: string;
    publishDate: string;
    coverColor: string;
    category: 'History' | 'Politics' | 'Literature' | 'Philosophy';
    description: string;
    downloadUrl?: string; // PDF link
    coverImage?: string; // Optional custom cover
    isForbidden?: boolean;
}

export const libraryData: Book[] = [
    {
        id: '1',
        title: 'برخیز و اول تو بکش',
        author: 'رونین برگمن',
        publishDate: '۲۰۱۸',
        coverColor: 'bg-[#8B0000]', // Fallback
        category: 'History',
        description: 'تاریخ پنهان ترورهای هدفمند اسرائیل.',
        isForbidden: true,
        coverImage: '/RiseandKill First.jpg',
        downloadUrl: '/rise-and-kill-first.pdf',
    },
    {
        id: '2',
        title: 'خطی در شن',
        author: 'جیمز بار',
        publishDate: '۲۰۱۱',
        coverColor: 'bg-[#C19A6B]', // Desert/Sand color
        category: 'History',
        description: 'رقابت بریتانیا و فرانسه برای شکل‌دهی خاورمیانه.',
        isForbidden: true,
        coverImage: '/alineinthesand.jpg',
        downloadUrl: '/alineinthesand.pdf',
    },
    {
        id: '3',
        title: 'مبارزه با تروریسم',
        author: 'بنیامین نتانیاهو',
        publishDate: '۱۹۹۵',
        coverColor: 'bg-[#191970]', // Midnight Blue
        category: 'Politics',
        description: 'چگونه دموکراسی‌ها می‌توانند شبکه تروریسم را شکست دهند.',
        isForbidden: true,
        coverImage: '/fightingterrorism.jpg',
        downloadUrl: '/fightingterrorism.pdf',
    },
    {
        id: '4',
        title: 'استراتژی ایران برای سلطه',
        author: 'سرلشکر ایال ضمیر',
        publishDate: '۲۰۲۲',
        coverColor: 'bg-[#2F4F4F]', // Dark Slate Gray
        category: 'Politics',
        description: 'تحلیل عمیق دکترین نظامی و نفوذ منطقه‌ای جمهوری اسلامی.',
        isForbidden: true,
        coverImage: '/theiranianstrategyforhegemony.jpg',
        downloadUrl: '/theiranianstrategyforhegemony.pdf',
    },
    {
        id: '5',
        title: 'شطرنج‌باز بزرگ',
        author: 'زبیگنیو برژینسکی',
        publishDate: '۱۹۹۷',
        coverColor: 'bg-[#000000]', // Black
        category: 'Politics',
        description: 'اولویت‌های استراتژیک آمریکا و ژئوپلیتیک اوراسیا.',
        isForbidden: true,
        coverImage: '/thegrandchessboard.jpg',
        downloadUrl: '/thegrandchessboard.pdf',
    },
];
