import { NextRequest, NextResponse } from 'next/server';
import { getPortfolio, updatePortfolio } from '@/lib/db';

export async function GET() {
  try {
    const portfolio = getPortfolio();
    return NextResponse.json(portfolio);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const updated = updatePortfolio(data);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
  }
}
