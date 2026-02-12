import { NextResponse } from 'next/server';

export const runtime = 'edge';

// NOTE: In Cloudflare or Serverless environments, this in-memory store is ephemeral (resets on deployment/cold start).
// For permanent production storage, you must use Cloudflare KV, D1, or an external database (Supabase/Firebase).
const votesStore: Record<string, number> = {
    'opt-monarchy-const': 0,
    'opt-monarchy-hered': 0,
    'opt-monarchy-elect': 0,
    'opt-republic': 0,
    'opt-economy': 0,
    'opt-justice': 0,
    'opt-prisoners': 0
};

const ipStore: Record<string, string[]> = {}; // pollId -> [hashedIPs]

async function hashIP(ip: string) {
    const msgBuffer = new TextEncoder().encode(ip);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: Request) {
    try {
        const { pollId, optionId } = await request.json();

        // precise IP extraction for Cloudflare/Next.js
        const ip = request.headers.get('cf-connecting-ip') ||
            request.headers.get('x-forwarded-for') ||
            'unknown';

        if (ip === 'unknown') {
            // For strict security, block unknown IPs. For dev, we might allow.
            // return NextResponse.json({ error: 'Cannot verify identity' }, { status: 403 });
        }

        const hashedIP = await hashIP(ip);

        // Initialize poll storage if needed
        if (!ipStore[pollId]) {
            ipStore[pollId] = [];
        }

        // 1. Check if IP has already voted
        if (ipStore[pollId].includes(hashedIP)) {
            return NextResponse.json({ error: 'شما قبلاً در این نظرسنجی شرکت کرده‌اید.' }, { status: 429 });
        }

        // 2. Register Vote
        ipStore[pollId].push(hashedIP);

        if (typeof votesStore[optionId] === 'number') {
            votesStore[optionId]++;
        } else {
            return NextResponse.json({ error: 'Invalid option' }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            votes: votesStore[optionId],
            message: 'رأی شما با موفقیت ثبت شد.'
        });

    } catch (error) {
        console.error('Vote Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    // Return current vote counts
    return NextResponse.json(votesStore);
}
