import * as React from 'react';

interface EmailTemplateProps {
    content: React.ReactNode;
    subject: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ content, subject }) => (
    <div style={{ fontFamily: 'Tahoma, Arial, sans-serif', maxWidth: '600px', margin: '0 auto', direction: 'rtl', backgroundColor: '#f9fafb', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
        {/* Header with Corner Logo */}
        <div style={{ backgroundColor: '#1E3A8A', padding: '20px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #FCD34D' }}>
            <div style={{ textAlign: 'right' }}>
                <h1 style={{ color: '#FCD34D', margin: 0, fontSize: '20px', fontWeight: 'bold' }}>شیر و خورشید</h1>
                <p style={{ color: '#e5e7eb', margin: '2px 0 0', fontSize: '12px' }}>حزب ایران نوین</p>
            </div>
            {/* Placeholder for Logo Image - replaced text with a visual circle representation if no image is available, or keep text if preferred. User asked for "Logo in corner". */}
            <div style={{ width: '40px', height: '40px', backgroundColor: '#FCD34D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1E3A8A', fontWeight: 'bold', fontSize: '18px' }}>🦁</div>
        </div>

        <div style={{ padding: '40px 30px', backgroundColor: '#ffffff', minHeight: '200px' }}>
            <h2 style={{ color: '#1E3A8A', marginTop: 0, fontSize: '18px', borderBottom: '1px solid #e5e7eb', paddingBottom: '15px', marginBottom: '20px' }}>
                {subject}
            </h2>
            <div style={{ color: '#374151', lineHeight: '1.8', fontSize: '14px' }}>
                {content}
            </div>
        </div>

        {/* Footer with Slogans */}
        <div style={{ backgroundColor: '#f3f4f6', padding: '20px', textAlign: 'center', borderTop: '1px solid #e5e7eb' }}>
            <p style={{ color: '#1E3A8A', margin: '5px 0', fontWeight: 'bold', fontSize: '16px' }}>پاینده باد ایران</p>
            <p style={{ color: '#B45309', margin: '5px 0', fontSize: '14px' }}>زنده باد پرچم شیر و خورشید</p>
            <p style={{ color: '#9CA3AF', marginTop: '20px', fontSize: '11px' }}>© {new Date().getFullYear()} Lion & Sun Opposition. All rights reserved.</p>
        </div>
    </div>
);
