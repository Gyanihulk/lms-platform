import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, year, branch, college, preferOffline, message } = body;

    if (!name || !email || !phone || !year || !branch) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new NextResponse("Invalid email", { status: 400 });
    }

    const existing = await db.workshopRegistration.findFirst({
      where: { email },
    });

    if (existing) {
      return new NextResponse("Already registered with this email", { status: 409 });
    }

    const registration = await db.workshopRegistration.create({
      data: {
        name,
        email,
        phone,
        year,
        branch,
        college: college || null,
        preferOffline: preferOffline ?? false,
        message: message || null,
      },
    });

    return NextResponse.json(registration);
  } catch (error) {
    console.error("[WORKSHOP_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const registrations = await db.workshopRegistration.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(registrations);
  } catch (error) {
    console.error("[WORKSHOP_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
