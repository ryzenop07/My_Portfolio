import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/portfolio`, {
      next: { revalidate: 10 }
    });
    const portfolio = await response.json();
    return NextResponse.json(portfolio);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch portfolio' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const response = await fetch(`${API_URL}/portfolio`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const updated = await response.json();
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update portfolio' }, { status: 500 });
  }
}
