import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  let body = {};

  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid or missing JSON body" },
      { status: 400 }
    );
  }

  const { slug, title } = body as { slug?: string; title?: string };

  if (!slug || !title) {
    return NextResponse.json(
      { error: "Missing slug or title" },
      { status: 400 }
    );
  }

  const page = await db.page.create({
    data: {
      slug,
      title,
    },
  });

  return NextResponse.json(page);
}
