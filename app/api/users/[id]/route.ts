// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RoleEnum } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

const UpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  imageUrl: z.string().url().optional().or(z.literal("").transform(() => undefined)),
  role: z.nativeEnum(RoleEnum).optional(),
  // Optional password change
  password: z.string().min(8, "Password must be at least 8 chars").optional(),
});

// GET single user (handy for detail views)
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await db.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        email: true,
        name: true,
        imageUrl: true,
        role: true,
        createdAt: true,
      },
    });
    if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(user);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// PATCH update
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const json = await req.json();
    const parsed = UpdateSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { name, imageUrl, role, password } = parsed.data;

    // build update data
    const data: any = {};
    if (name !== undefined) data.name = name;
    if (imageUrl !== undefined) data.imageUrl = imageUrl;
    if (role !== undefined) data.role = role;
    if (password) data.password = await bcrypt.hash(password, 10);

    const updated = await db.user.update({
      where: { id: params.id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        imageUrl: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      message: "User updated",
      user: updated,
    });
  } catch (error: any) {
    // Prisma not found
    if (error?.code === "P2025") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
