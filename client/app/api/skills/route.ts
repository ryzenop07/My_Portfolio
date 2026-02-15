import { NextRequest, NextResponse } from 'next/server';
import { getSkills, addSkill } from '@/lib/db';

export async function GET() {
  try {
    const skills = getSkills();
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const skill = addSkill(data);
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}
