import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export const runtime = 'edge';

// Fallback counter for local dev without Redis configured
let localCounter = 0;

// Initialize Redis client if environment variables are set
function getRedisClient() {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
        console.log('Upstash credentials not found, using local counter');
        return null;
    }

    return new Redis({
        url,
        token,
    });
}

export async function GET(request: Request) {
    try {
        const redis = getRedisClient();

        if (redis) {
            // Get count from Redis
            const count = await redis.get<number>('total_resistance_ids');
            return NextResponse.json({ count: count || 0 });
        }

        // Fallback to local counter
        return NextResponse.json({ count: localCounter });
    } catch (error) {
        console.error('Stats GET error:', error);
        return NextResponse.json({ count: localCounter });
    }
}

export async function POST(request: Request) {
    try {
        const redis = getRedisClient();
        let newCount = 1;

        if (redis) {
            // Increment in Redis atomically
            newCount = await redis.incr('total_resistance_ids');
        } else {
            // Fallback to local counter
            localCounter++;
            newCount = localCounter;
        }

        return NextResponse.json({
            success: true,
            count: newCount
        });
    } catch (error) {
        console.error('Stats POST error:', error);
        // Fallback to local counter on error
        localCounter++;
        return NextResponse.json({
            success: true,
            count: localCounter
        });
    }
}
