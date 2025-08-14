import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth/config"; // your NextAuth config
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // ✅ Get session from NextAuth
    const session = await getServerSession(authConfig);

    // ✅ Check if user is logged in
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // ✅ Parse request body
    const { title } = await req.json();

    // ✅ Create course with the authenticated user's ID
    const course = await db.course.create({
      data: {
        userId: session.user.id,
        title,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.error("[Courses post]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
