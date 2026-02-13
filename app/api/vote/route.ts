import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const runtime = 'edge';

// Initialize Redis client
function getRedisClient() {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
        console.log('Upstash credentials not found for voting');
        return null;
    }

    return new Redis({ url, token });
}

// Fallback in-memory storage for local dev
const localVotesStore: Record<string, number> = {
    'opt-monarchy-const': 0,
    'opt-monarchy-hered': 0,
    'opt-monarchy-elect': 0,
    'opt-republic': 0,
    'opt-economy': 0,
    'opt-justice': 0,
    'opt-prisoners': 0
};
const localIpStore: Record<string, string[]> = {};

async function hashIP(ip: string) {
    const msgBuffer = new TextEncoder().encode(ip);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: Request) {
    try {
        const { pollId, optionId } = await request.json();
        const redis = getRedisClient();

        // Get IP
        const ip = request.headers.get('cf-connecting-ip') ||
            request.headers.get('x-forwarded-for') ||
            'unknown';

        const hashedIP = await hashIP(ip);

        if (redis) {
            // === REDIS PATH ===
            // Check if IP has already voted
            const votersKey = `poll:${pollId}:voters`;
            const voters = (await redis.smembers(votersKey) as string[]) || [];

            if (voters.includes(hashedIP)) {
                return NextResponse.json({ error: 'شما قبلاً در این نظرسنجی شرکت کرده‌اید.' }, { status: 429 });
            }

            // Add IP to voters set
            await redis.sadd(votersKey, hashedIP);

            // Increment vote count
            const voteKey = `vote:${optionId}`;
            const newCount = await redis.incr(voteKey);

            return NextResponse.json({
                success: true,
                votes: newCount,
                message: 'رأی شما با موفقیت ثبت شد.'
            });
        } else {
            // === FALLBACK: LOCAL MEMORY ===
            if (!localIpStore[pollId]) {
                localIpStore[pollId] = [];
            }

            if (localIpStore[pollId].includes(hashedIP)) {
                return NextResponse.json({ error: 'شما قبلاً در این نظرسنجی شرکت کرده‌اید.' }, { status: 429 });
            }

            localIpStore[pollId].push(hashedIP);

            if (typeof localVotesStore[optionId] === 'number') {
                localVotesStore[optionId]++;
            } else {
                return NextResponse.json({ error: 'Invalid option' }, { status: 400 });
            }

            return NextResponse.json({
                success: true,
                votes: localVotesStore[optionId],
                message: 'رأی شما با موفقیت ثبت شد.'
            });
        }

    } catch (error) {
        console.error('Vote Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        const redis = getRedisClient();

        if (redis) {
            // === REDIS PATH ===
            const optionIds = [
                'opt-monarchy-const',
                'opt-monarchy-hered',
                'opt-monarchy-elect',
                'opt-republic',
                'opt-economy',
                'opt-justice',
                'opt-prisoners'
            ];

            const votes: Record<string, number> = {};

            // Fetch all vote counts from Redis
            for (const optionId of optionIds) {
                const count = await redis.get<number>(`vote:${optionId}`);
                votes[optionId] = count || 0;
            }

            return NextResponse.json(votes);
        } else {
            // === FALLBACK: LOCAL MEMORY ===
            return NextResponse.json(localVotesStore);
        }
    } catch (error) {
        console.error('Get votes error:', error);
        return NextResponse.json(localVotesStore);
    }
}
