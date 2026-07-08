import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB per image
const MAX_FILES = 10;
const RECIPIENT_EMAIL = 'rithwikbblvarun@gmail.com';

// Rate limiting: simple in-memory store (resets on server restart)
const submissionTimes = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour window
  const maxPerHour = 5;

  const times = (submissionTimes.get(ip) || []).filter((t) => now - t < windowMs);
  if (times.length >= maxPerHour) return true;

  times.push(now);
  submissionTimes.set(ip, times);
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse multipart form data
    const formData = await request.formData();

    // Honeypot spam check — bots fill this hidden field
    const honeypot = formData.get('website') as string;
    if (honeypot && honeypot.trim().length > 0) {
      // Silently succeed to confuse bots
      return NextResponse.json({ success: true });
    }

    // Time gate: form must be submitted at least 4 seconds after load
    const formLoadTime = parseInt((formData.get('_t') as string) || '0', 10);
    const elapsed = Date.now() - formLoadTime;
    if (!formLoadTime || elapsed < 4000) {
      return NextResponse.json({ error: 'Submission too fast. Please try again.' }, { status: 400 });
    }

    // Extract text fields
    const name = (formData.get('name') as string)?.trim();
    const phone = (formData.get('phone') as string)?.trim();
    const email = (formData.get('email') as string)?.trim() || 'Not provided';
    const category = (formData.get('category') as string)?.trim() || 'projects';
    const message = (formData.get('message') as string)?.trim() || 'No message provided';

    // Validate required fields
    if (!name || name.length < 2) {
      return NextResponse.json({ error: 'Name is required (minimum 2 characters).' }, { status: 400 });
    }
    if (!phone || !/^\+?[\d\s\-()]{7,15}$/.test(phone)) {
      return NextResponse.json({ error: 'A valid phone number is required.' }, { status: 400 });
    }

    // Extract and validate image files
    const files = formData.getAll('images') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'At least one project image is required.' }, { status: 400 });
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `You can upload a maximum of ${MAX_FILES} images.` },
        { status: 400 }
      );
    }

    // Validate each file
    for (const file of files) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        return NextResponse.json(
          { error: `File "${file.name}" is not a supported format. Use JPG, PNG, or WEBP.` },
          { status: 400 }
        );
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds the 10 MB limit.` },
          { status: 400 }
        );
      }
    }

    // Build email attachments from files (base64 encoded)
    const attachments: Array<{ filename: string; content: string; type: string }> = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      attachments.push({
        filename: `project-image-${i + 1}.${ext}`,
        content: base64,
        type: file.type,
      });
    }

    // Format category string
    const categoryName = category === 'factory' ? 'Manufacturing Mills' : category === 'machinery' ? 'Advanced Machinery' : 'Completed Projects';

    // Build email HTML body
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f8f9fa; padding: 20px;">
        <div style="background: #0f2942; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
          <h1 style="color: #f59e0b; margin: 0; font-size: 20px; letter-spacing: 2px;">SSN INDUSTRIES</h1>
          <p style="color: #94a3b8; margin: 8px 0 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">New Project Image Upload</p>
        </div>
        
        <div style="background: #fff; padding: 28px; border: 1px solid #e2e8f0; border-top: none;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 12px 8px; font-weight: bold; color: #475569; width: 140px;">Customer Name</td>
              <td style="padding: 12px 8px; color: #1e293b;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9; background: #f8fafc;">
              <td style="padding: 12px 8px; font-weight: bold; color: #475569;">Phone Number</td>
              <td style="padding: 12px 8px; color: #1e293b;">${phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 12px 8px; font-weight: bold; color: #475569;">Email</td>
              <td style="padding: 12px 8px; color: #1e293b;">${email}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9; background: #f8fafc;">
              <td style="padding: 12px 8px; font-weight: bold; color: #475569;">Gallery Category</td>
              <td style="padding: 12px 8px; color: #1e293b; font-weight: bold;">${categoryName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 12px 8px; font-weight: bold; color: #475569;">Images Uploaded</td>
              <td style="padding: 12px 8px; color: #1e293b;">${files.length} image${files.length > 1 ? 's' : ''} (see attachments)</td>
            </tr>
          </table>

          ${message !== 'No message provided' ? `
          <div style="margin-top: 20px; padding: 16px; background: #f8fafc; border-left: 3px solid #f59e0b; border-radius: 4px;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #475569; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message from Customer</p>
            <p style="margin: 0; color: #374151; line-height: 1.6;">${message}</p>
          </div>
          ` : ''}
        </div>

        <div style="background: #0f2942; padding: 16px; border-radius: 0 0 8px 8px; text-align: center;">
          <p style="color: #64748b; font-size: 11px; margin: 0;">
            This submission was received from the SSN Industries website project upload form.<br/>
            Submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
          </p>
        </div>
      </div>
    `;

    // Send email via Resend
    if (resend) {
      await resend.emails.send({
        from: 'SSN Industries <onboarding@resend.dev>',
        to: RECIPIENT_EMAIL,
        subject: `📸 New Project Images from ${name} (${phone})`,
        html: htmlBody,
        attachments: attachments.map((a) => ({
          filename: a.filename,
          content: a.content,
        })),
      });
    } else {
      // Dev fallback: log submission details
      console.log('[DEV MODE] Project upload received:');
      console.log(`  Name: ${name} | Phone: ${phone} | Email: ${email}`);
      console.log(`  Message: ${message}`);
      console.log(`  Images: ${files.map((f) => f.name).join(', ')}`);
      console.log('[DEV MODE] Set RESEND_API_KEY in .env.local to enable actual email delivery.');
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown server error';
    console.error('[upload-project] Error:', message);
    return NextResponse.json({ error: 'Failed to process your submission. Please try again.' }, { status: 500 });
  }
}
