import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const brandSchema = z.object({
  name: z.string().min(2, 'Brand name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  logoUrl: z.string().url('Invalid logo URL').optional().nullable(),
  description: z.string().max(500, 'Description cannot exceed 500 characters').optional().nullable(),
});

export async function GET() {
  try {
    const brands = await db.brand.findMany({
      orderBy: {
        name: 'asc',
      },
    });
    return NextResponse.json(brands);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = brandSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const { name, slug, logoUrl, description } = result.data;

    const existingBrand = await db.brand.findUnique({
      where: { slug },
    });

    if (existingBrand) {
      return NextResponse.json({ error: 'Brand with this slug already exists' }, { status: 400 });
    }

    const brand = await db.brand.create({
      data: {
        name,
        slug,
        logoUrl: logoUrl || null,
        description: description || null,
      },
    });

    return NextResponse.json(brand, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
