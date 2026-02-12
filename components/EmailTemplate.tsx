import * as React from 'react';

interface EmailTemplateProps {
    content: React.ReactNode;
    subject: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ content, subject }) => (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', direction: 'rtl' }}>
        <div style={{ backgroundColor: '#1E3A8A', padding: '20px', textAlign: 'center', borderRadius: '8px 8px 0 0' }}>
            {/* Use an absolute URL for the logo in production, or text fallback if missing */}
            <h1 style={{ color: '#FCD34D', margin: 0, fontSize: '24px' }}>شیر و خورشید</h1>
            <p style={{ color: '#ffffff', margin: '5px 0 0', fontSize: '14px' }}>حزب ایران نوین</p>
        </div>

        <div style={{ padding: '30px', border: '1px solid #e5e7eb', borderTop: 'none', borderRadius: '0 0 8px 8px', backgroundColor: '#ffffff' }}>
            <h2 style={{ color: '#111827', marginTop: 0, borderBottom: '2px solid #FCD34D', paddingBottom: '10px', display: 'inline-block' }}>
                {subject}
            </h2>
            <div style={{ color: '#374151', lineHeight: '1.6', marginTop: '20px' }}>
                {content}
            </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', color: '#6B7280', fontSize: '12px' }}>
            <p>© {new Date().getFullYear()} Lion & Sun Opposition. All rights reserved.</p>
        </div>
    </div>
);
