export interface PollOption {
    id: string;
    text: string;
    votes: number; // Mock initial votes
}

export interface Poll {
    id: string;
    question: string;
    options: PollOption[];
    totalVotes: number;
}

export const pollsData: Poll[] = [
    {
        id: 'poll-001',
        question: 'نوع نظام سیاسی مطلوب شما برای ایران آینده چیست؟',
        totalVotes: 12540,
        options: [
            { id: 'opt-1', text: 'جمهوری سکولار', votes: 5120 },
            { id: 'opt-2', text: 'پادشاهی مشروطه', votes: 6380 },
            { id: 'opt-3', text: 'فدرالیسم', votes: 1040 }
        ]
    },
    {
        id: 'poll-002',
        question: 'مهم‌ترین اولویت دولت موقت در ۱۰۰ روز نخست؟',
        totalVotes: 8900,
        options: [
            { id: 'opt-4', text: 'تثبیت نرخ ارز و اقتصاد', votes: 3200 },
            { id: 'opt-5', text: 'محاکمه سران رژیم', votes: 4100 },
            { id: 'opt-6', text: 'آزادی زندانیان سیاسی', votes: 1600 }
        ]
    }
];
