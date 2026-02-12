import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// File path for persistence (works in local dev and some server environments, but not Vercel/Cloudflare Edge)
const DB_PATH = path.join(process.cwd(), 'data', 'votes.json');

// Interface for our simple JSON DB
interface VoteData {
    votes: Record<string, number>;
    ips: Record<string, string[]>;
}

async function getDB(): Promise<VoteData> {
    try {
        const data = await fs.readFile(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Fallback default if file doesn't exist or error
        return {
            votes: {
                "opt-monarchy-const": 0,
                "opt-monarchy-hered": 0,
                "opt-monarchy-elect": 0,
                "opt-republic": 0,
                "opt-economy": 0,
                "opt-justice": 0,
                "opt-prisoners": 0
            },
            ips: {}
        };
    }
}

async function saveDB(data: VoteData) {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
}

async function hashIP(ip: string) {
    const msgBuffer = new TextEncoder().encode(ip);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: Request) {
    try {
        const { pollId, optionId } = await request.json();

        // precise IP extraction
        const ip = request.headers.get('x-forwarded-for') ||
            'unknown';

        if (ip === 'unknown') {
            // For strict security, block unknown IPs. For dev, we might allow.
            // return NextResponse.json({ error: 'Cannot verify identity' }, { status: 403 });
        }

        const hashedIP = await hashIP(ip);
        const db = await getDB();

        // Initialize poll storage if needed
        if (!db.ips[pollId]) {
            db.ips[pollId] = [];
        }

        // 1. Check if IP has already voted
        if (db.ips[pollId].includes(hashedIP)) {
            return NextResponse.json({ error: 'شما قبلاً در این نظرسنجی شرکت کرده‌اید.' }, { status: 429 });
        }

        // 2. Register Vote
        db.ips[pollId].push(hashedIP);

        if (typeof db.votes[optionId] === 'number') {
            db.votes[optionId]++;
        } else {
            return NextResponse.json({ error: 'Invalid option' }, { status: 400 });
        }

        // Save to disk
        await saveDB(db);

        return NextResponse.json({
            success: true,
            votes: db.votes[optionId],
            message: 'رأی شما با موفقیت ثبت شد.'
        });

    } catch (error) {
        console.error('Vote Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    const db = await getDB();
    return NextResponse.json(db.votes);
}
