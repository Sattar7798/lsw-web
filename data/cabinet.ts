export interface CabinetMember {
    id: string;
    name: string;
    role: string; // e.g., Prime Minister, Minister of Economy
    bio: string;
    imageUrl: string; // Placeholder or actual image
    priorities: string[]; // Key focus areas
    socialLinks?: {
        twitter?: string;
        linkedin?: string;
    };
}

export const cabinetData: CabinetMember[] = [
    {
        id: 'pm',
        name: 'شورای گذار',
        role: 'رهبری دولت موقت',
        bio: 'نهاد عالی تصمیم‌گیری متشکل از نمایندگان احزاب و متخصصین برجسته برای مدیریت دوران گذار ۱۰۰ روزه.',
        imageUrl: '/images/council-placeholder.jpg',
        priorities: ['برگزاری رفراندوم', 'انحلال نهادهای سرکوب', 'تامین امنیت عمومی'],
    },
    {
        id: 'min-econ',
        name: 'دکتر [نام محفوظ]',
        role: 'وزیر اقتصاد و دارایی',
        bio: 'استاد اقتصاد دانشگاه استنفورد با تجربه در بازسازی اقتصادهای پس از جنگ.',
        imageUrl: '/images/avatar-placeholder.jpg',
        priorities: ['تثبیت نرخ ارز', 'جذب سرمایه‌گذاری خارجی', 'مدیریت منابع نفتی'],
    },
    {
        id: 'min-just',
        name: 'بانو [نام محفوظ]',
        role: 'وزیر دادگستری',
        bio: 'وکیل بین‌المللی حقوق بشر و فعال در دادگاه‌های لاهه.',
        imageUrl: '/images/avatar-placeholder.jpg',
        priorities: ['لغو حکم اعدام', 'بازنگری در قوانین جزایی', 'استقلال قوه قضاییه'],
    },
    {
        id: 'min-energy',
        name: 'مهندس [نام محفوظ]',
        role: 'وزیر نیرو',
        bio: 'متخصص ارشد مدیریت آب و انرژی با سابقه مدیریت پروژه‌های کلان در خاورمیانه.',
        imageUrl: '/images/avatar-placeholder.jpg',
        priorities: ['حل بحران آب', 'توسعه انرژی‌های تجدیدپذیر', 'نوسازی شبکه برق'],
    },
];
