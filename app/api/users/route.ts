// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { RoleEnum } from "@prisma/client"; // Prisma enum

// optional: guard against invalid roles in query
const roleSet = new Set(Object.values(RoleEnum));

function parseRolesParam(param?: string | null): RoleEnum[] | undefined {
  if (!param) return undefined;
  const roles = param.split(",").map(s => s.trim()).filter(Boolean);
  const valid = roles.filter((r): r is RoleEnum => roleSet.has(r as RoleEnum));
  return valid.length ? (valid as RoleEnum[]) : undefined;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // filters
    const roles = parseRolesParam(searchParams.get("roles")); // e.g. ADMIN,TEACHER
    const search = searchParams.get("search")?.trim() || "";  // name/email substring
    const sortBy = (searchParams.get("sortBy") || "createdAt") as
      | "createdAt"
      | "name"
      | "email"
      | "role";
    const sortOrder = (searchParams.get("order") || "desc") as "asc" | "desc";

    // pagination
    const page = Math.max(1, Number(searchParams.get("page") || 1));
    const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") || 20)));
    const skip = (page - 1) * limit;

    // where clause
    const where: any = {};
    if (roles?.length) {
      // simple single-role field filter
      where.role = { in: roles };
    }
    if (search) {
      where.OR = [
        { email: { contains: search, mode: "insensitive" } },
        { name: { contains: search, mode: "insensitive" } },
      ];
    }

    const [total, items] = await Promise.all([
      db.user.count({ where }),
      db.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
        select: {
          id: true,
          email: true,
          name: true,
          imageUrl: true,
          role: true,
          createdAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      items,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
