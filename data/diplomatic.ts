export interface DiplomaticDocument {
    id: string;
    title: string;
    recipient: string; // e.g., "European Parliament", "UN Security Council"
    date: string;
    summary: string;
    status: 'Sent' | 'Delivered' | 'Acknowledged';
    language: 'English' | 'French' | 'German';
    pdfUrl: string;
}

// Emtpy for production launch
export const diplomaticData: DiplomaticDocument[] = [
    // {
    //     id: 'dip-001',
    //     title: 'Request for Classification of IRGC as Terrorist Organization',
    //     ...
    // }
];

export const embassyContacts = [
    { city: 'London', country: 'UK', email: 'london@lionandsun.org', pbo: 'PO Box 1979' },
    { city: 'Paris', country: 'France', email: 'paris@lionandsun.org', pbo: 'BP 2535' },
    { city: 'Washington DC', country: 'USA', email: 'dc@lionandsun.org', pbo: 'Suite 2026' },
];
