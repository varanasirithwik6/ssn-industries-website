import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { z } from 'zod';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional().nullable(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  status: z.string().optional().default('PENDING'),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const where: Record<string, string> = {};
    if (status) where.status = status;

    const enquiries = await db.enquiry.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(enquiries);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = enquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const { name, email, phone, subject, message, status } = result.data;

    const enquiry = await db.enquiry.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status,
      },
    });

    // Send email alert to ssnindustries7@gmail.com
    try {
      if (resend) {
        await resend.emails.send({
          from: 'SSN Industries <onboarding@resend.dev>',
          to: 'ssnindustries7@gmail.com',
          subject: `New Portal Inquiry: ${subject}`,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nSubject: ${subject}\n\nMessage:\n${message}`,
        });
      } else {
        console.log(`[MOCK EMAIL SENT] To: ssnindustries7@gmail.com | Subject: ${subject} | Details: ${name} (${email})`);
      }
    } catch (mailErr) {
      console.error('Failed to send enquiry email notification:', mailErr);
    }

    return NextResponse.json(enquiry, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
