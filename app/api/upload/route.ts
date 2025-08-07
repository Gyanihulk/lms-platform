import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import { v4 as uuid } from 'uuid'

export const config = {
  runtime: 'nodejs', // ✅ Required to use fs, path, etc.
}

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())
  const filename = `${uuid()}-${file.name}`
  const filePath = join(process.cwd(), 'public/uploads', filename)

  try {
    await writeFile(filePath, buffer)
    return NextResponse.json({ path: `/uploads/${filename}` })
  } catch (err) {
    console.error('[UPLOAD_ERROR]', err)
    return NextResponse.json({ error: 'Failed to save file' }, { status: 500 })
  }
}
