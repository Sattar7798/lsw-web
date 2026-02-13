import { NextResponse } from 'next/server';

export const runtime = 'edge';

// Fallback counter for local/non-KV environments
let localCounter = 0;

export async function GET(request: Request) {
    try {
        // In Cloudflare Pages, bindings are available via platform context
        // @ts-ignore - Cloudflare-specific env binding
        const env: Env | undefined = (request as any).env || (globalThis as any).env;

        if (env?.STATS_KV) {
            const count = await env.STATS_KV.get('total_resistance_ids');
            return NextResponse.json({ count: parseInt(count || '0', 10) });
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
        // In Cloudflare Pages, bindings are available via platform context
        // @ts-ignore - Cloudflare-specific env binding  
        const env: Env | undefined = (request as any).env || (globalThis as any).env;

        let newCount = 1;

        if (env?.STATS_KV) {
            const current = await env.STATS_KV.get('total_resistance_ids');
            newCount = parseInt(current || '0', 10) + 1;
            await env.STATS_KV.put('total_resistance_ids', newCount.toString());
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
        // Even on error, increment local counter
        localCounter++;
        return NextResponse.json({
            success: true,
            count: localCounter
        });
    }
}
