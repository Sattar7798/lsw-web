export interface DocumentItem {
    id: string;
    title: string;
    description: string;
    type: 'Constitution' | 'Charter' | 'Report' | 'Legal';
    publishDate: string;
    slug: string; // Internal link or PDF link
    coverImage?: string; // Optional cover
    isExternal?: boolean;
}

export const documentsData: DocumentItem[] = [
    {
        id: 'doc-001',
        title: 'پیش‌نویس قانون اساسی نوین',
        description: 'متن کامل پیش‌نویس پیشنهادی برای قانون اساسی دوران گذار، تدوین شده توسط حقوق‌دانان برجسته.',
        type: 'Constitution',
        publishDate: '۱۴۰۴/۰۱/۱۰',
        slug: '/documents/constitution',
        isExternal: false
    },
    {
        id: 'doc-002',
        title: 'منشور حقوق شهروندی',
        description: 'بیانیه اصول بنیادین حقوق مدنی و آزادی‌های فردی در ایران آزاد فردا.',
        type: 'Charter',
        publishDate: '۱۴۰۳/۱۱/۲۰',
        slug: '/documents/charter', // To be implemented
        isExternal: false
    },
    {
        id: 'doc-003',
        title: 'برنامه ۱۰۰ روزه حزب ملی',
        description: 'نقشه راه اجرایی برای سه ماهه نخست پس از فروپاشی جمهوری اسلامی برای تثبیت اوضاع.',
        type: 'Report',
        publishDate: '۱۴۰۳/۱۲/۱۵',
        slug: '#', // Placeholder
        isExternal: true
    },
    {
        id: 'doc-004',
        title: 'گزارش نقض حقوق بشر - پاییز ۱۴۰۳',
        description: 'مستندات جمع‌آوری شده از جنایات میدانی رژیم جهت ارائه به دادگاه‌های بین‌المللی.',
        type: 'Legal',
        publishDate: '۱۴۰۳/۰۹/۳۰',
        slug: '#',
        isExternal: true
    }
];
