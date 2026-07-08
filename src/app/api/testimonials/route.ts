import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const testimonialSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.string().min(2, 'Role must be at least 2 characters'),
  company: z.string().optional().nullable(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  rating: z.number().int().min(1).max(5).optional().default(5),
  avatarUrl: z.string().url('Invalid avatar URL').optional().nullable(),
});

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(testimonials);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = testimonialSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const { name, role, company, message, rating, avatarUrl } = result.data;

    const testimonial = await db.testimonial.create({
      data: {
        name,
        role,
        company: company || null,
        message,
        rating,
        avatarUrl: avatarUrl || null,
      },
    });

    return NextResponse.json(testimonial, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
