import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  categoryId: z.string().cuid('Invalid category ID'),
  brandId: z.string().cuid('Invalid brand ID').optional().nullable(),
  specs: z.record(z.string(), z.any()),
  imageUrl: z.string().url('Invalid image URL').optional().nullable(),
  datasheetUrl: z.string().url('Invalid datasheet URL').optional().nullable(),
  isActive: z.boolean().optional().default(true),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const brandId = searchParams.get('brandId');
    const activeOnly = searchParams.get('activeOnly') !== 'false';

    const where: Record<string, string | boolean> = {};
    if (categoryId) where.categoryId = categoryId;
    if (brandId) where.brandId = brandId;
    if (activeOnly) where.isActive = true;

    const products = await db.product.findMany({
      where,
      include: {
        category: true,
        brand: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(products);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = productSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const { name, slug, description, categoryId, brandId, specs, imageUrl, datasheetUrl, isActive } = result.data;

    const existingProduct = await db.product.findUnique({
      where: { slug },
    });

    if (existingProduct) {
      return NextResponse.json({ error: 'Product with this slug already exists' }, { status: 400 });
    }

    const product = await db.product.create({
      data: {
        name,
        slug,
        description,
        categoryId,
        brandId: brandId || null,
        specs,
        imageUrl: imageUrl || null,
        datasheetUrl: datasheetUrl || null,
        isActive,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
