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


export async function GET() {
  try {
    const pages = await db.page.findMany({
      orderBy: { createdAt: "desc" }, // optional, if you have createdAt
    });

    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch pages" },
      { status: 500 }
    );
  }
}