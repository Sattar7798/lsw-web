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
        id: 'poll-system-v2',
        question: 'نوع نظام سیاسی مطلوب شما برای ایران آینده چیست؟',
        totalVotes: 0,
        options: [
            { id: 'opt-monarchy-const', text: 'پادشاهی مشروطه', votes: 0 },
            { id: 'opt-monarchy-hered', text: 'پادشاهی موروثی', votes: 0 },
            { id: 'opt-monarchy-elect', text: 'پادشاهی انتخابی', votes: 0 },
            { id: 'opt-republic', text: 'جمهوری', votes: 0 }
        ]
    },
    {
        id: 'poll-interim-v2',
        question: 'مهم‌ترین اولویت حزب ملی در ۱۰۰ روز نخست؟',
        totalVotes: 0,
        options: [
            { id: 'opt-economy', text: 'تثبیت نرخ ارز و اقتصاد', votes: 0 },
            { id: 'opt-justice', text: 'محاکمه سران رژیم', votes: 0 },
            { id: 'opt-prisoners', text: 'آزادی زندانیان سیاسی', votes: 0 }
        ]
    }
];
