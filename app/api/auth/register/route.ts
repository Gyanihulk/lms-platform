import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client"; // import enum

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, role } = body;

    // ✅ Validate required fields
    if (!email || !password || !role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // ✅ Validate role against enum
    if (!Object.values(Role).includes(role)) {
      return NextResponse.json(
        { error: `Invalid role. Must be one of: ${Object.values(Role).join(", ")}` },
        { status: 400 }
      );
    }

    // ✅ Check for existing user
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    // ✅ Hash password
    const hashedPassword = await hash(password, 10);

    // ✅ Create user
    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role, // directly assign the validated enum role
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
