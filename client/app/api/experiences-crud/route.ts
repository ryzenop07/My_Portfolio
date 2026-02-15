import { NextRequest, NextResponse } from 'next/server';
import { getExperiences, addExperience, updateExperience, deleteExperience } from '@/lib/db';

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
    const newExp = {
      id: Date.now().toString(),
      company: data.company,
      position: data.position,
      startDate: data.startDate,
      endDate: data.endDate,
      isCurrently: data.isCurrently,
      description: data.description,
      technologies: data.technologies || [],
    };
    const experience = addExperience(newExp);
    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const updated = updateExperience(data.id, {
      company: data.company,
      position: data.position,
      startDate: data.startDate,
      endDate: data.endDate,
      isCurrently: data.isCurrently,
      description: data.description,
      technologies: data.technologies,
    });
    if (!updated) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    const deleted = deleteExperience(id);
    if (!deleted) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}
