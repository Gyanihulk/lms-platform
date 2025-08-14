import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuid } from 'uuid';

export const runtime = 'nodejs'; // ✅ Node runtime for fs/path

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  // Convert to Uint8Array to satisfy writeFile type requirements
  const buffer = new Uint8Array(await file.arrayBuffer());

  const filename = `${uuid()}-${file.name}`;
  const uploadDir = join(process.cwd(), 'public', 'uploads');
  const filePath = join(uploadDir, filename);

  try {
    // Ensure the upload directory exists
    await mkdir(uploadDir, { recursive: true });

    // Save file
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      path: `/uploads/${filename}`,
    });
  } catch (err) {
    console.error('[UPLOAD_ERROR]', err);
    return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
  }
}
