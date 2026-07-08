import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const gallerySchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  imageUrl: z.string().url('Invalid image URL'),
  caption: z.string().max(300, 'Caption cannot exceed 300 characters').optional().nullable(),
  tag: z.string().optional().default('General'),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get('tag');

    const where: Record<string, string> = {};
    if (tag) where.tag = tag;

    const galleryItems = await db.gallery.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(galleryItems);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = gallerySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const { title, imageUrl, caption, tag } = result.data;

    const galleryItem = await db.gallery.create({
      data: {
        title,
        imageUrl,
        caption: caption || null,
        tag,
      },
    });

    return NextResponse.json(galleryItem, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
