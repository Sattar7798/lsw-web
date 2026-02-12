import { NextResponse } from 'next/server';

export const runtime = 'edge';

// In-memory storage for the "Real" counter.
// Note: This resets on deployment/cold start.
// For persistence, we would need a database (KV/D1/Supabase).
let totalResistanceIDs = 0;

export async function GET(request: Request) {
    return NextResponse.json({ count: totalResistanceIDs });
}

export async function POST(request: Request) {
    try {
        totalResistanceIDs++;
        return NextResponse.json({
            success: true,
            count: totalResistanceIDs
        });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
