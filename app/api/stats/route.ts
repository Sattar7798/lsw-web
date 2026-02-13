import { NextResponse } from 'next/server';

export const runtime = 'edge';

// Fallback to in-memory for local dev
let localCounter = 0;

export async function GET(request: Request) {
    try {
        // Access Cloudflare KV binding from the runtime
        // @ts-ignore - Cloudflare binding
        const env = request.cf?.env || (globalThis as any).STATS_KV;
        const KV = env?.STATS_KV;

        // Try to get from KV first (production)
        if (KV && typeof KV.get === 'function') {
            const count = await KV.get('total_resistance_ids');
            return NextResponse.json({ count: parseInt(count || '0', 10) });
        }

        // Fallback to in-memory (local dev)
        return NextResponse.json({ count: localCounter });
    } catch (error) {
        console.error('Stats GET error:', error);
        return NextResponse.json({ count: 0 });
    }
}

export async function POST(request: Request) {
    try {
        let newCount = 1;

        // Access Cloudflare KV binding from the runtime
        // @ts-ignore - Cloudflare binding
        const env = request.cf?.env || (globalThis as any).STATS_KV;
        const KV = env?.STATS_KV;

        // Try to use KV first (production)
        if (KV && typeof KV.get === 'function' && typeof KV.put === 'function') {
            const current = await KV.get('total_resistance_ids');
            newCount = parseInt(current || '0', 10) + 1;
            await KV.put('total_resistance_ids', newCount.toString());
        } else {
            // Fallback to in-memory (local dev)
            localCounter++;
            newCount = localCounter;
        }

        return NextResponse.json({
            success: true,
            count: newCount
        });
    } catch (error) {
        console.error('Stats POST error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
