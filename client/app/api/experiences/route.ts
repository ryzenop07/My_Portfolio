import { NextRequest, NextResponse } from 'next/server';
import { getExperiences, addExperience } from '@/lib/db';

export async function GET() {
  try {
    const experiences = getExperiences();
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const experience = addExperience(data);
    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}
