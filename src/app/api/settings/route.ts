import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';

const settingsSchema = z.array(
  z.object({
    key: z.string().min(1, 'Key cannot be empty'),
    value: z.string(),
  })
);

export async function GET() {
  try {
    const settings = await db.websiteSetting.findMany();
    // Format settings as a single key-value map for easier client-side consumption
    const settingsMap = settings.reduce((acc, current) => {
      acc[current.key] = current.value;
      return acc;
    }, {} as Record<string, string>);

    return NextResponse.json(settingsMap);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = settingsSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const updates = result.data;

    // Perform bulk upsert in transaction
    const upserts = updates.map((setting) =>
      db.websiteSetting.upsert({
        where: { key: setting.key },
        update: { value: setting.value },
        create: { key: setting.key, value: setting.value },
      })
    );

    const updatedSettings = await db.$transaction(upserts);

    return NextResponse.json({
      message: 'Website settings updated successfully',
      count: updatedSettings.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
