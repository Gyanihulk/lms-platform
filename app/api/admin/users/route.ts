import { db } from "@/lib/db";
import { bad, ok, server } from "@/app/api/_lib/http";
import { requireAdmin } from "@/app/api/_lib/auth";
import bcrypt from "bcryptjs";

import { NextRequest } from "next/server";
import { createUserSchema, listUsersQuerySchema } from "@/lib/validation/user";
import { currentUser } from "@/lib/auth/current-user";
import { RoleEnum } from "@prisma/client";

export async function GET(req: NextRequest) {
    const user = await currentUser();
    if (!user) return bad("Unauthorized", 401);
    const adminRoles: RoleEnum[] = [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN];
    if (!adminRoles.includes(user.role)) {
      return bad("Forbidden", 403);
    }
  try {
    const { searchParams } = new URL(req.url);
    const parsed = listUsersQuerySchema.safeParse(Object.fromEntries(searchParams));
    if (!parsed.success) return bad("Invalid query");

    const { page, pageSize, q } = parsed.data;
    const where = q
      ? {
          OR: [
            { email: { contains: q, mode: "insensitive" } },
            { name: { contains: q, mode: "insensitive" } },
          ],
        }
      : {};

    const [items, total] = await Promise.all([
      db.user.findMany({
        orderBy: { createdAt: "desc" }
      }),
      db.user.count({  }),
    ]);

    return ok({ items, total, page, pageSize });
  } catch (e) {
    return server(e);
  }
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const body = await req.json();
    const parsed = createUserSchema.safeParse(body);
    if (!parsed.success) return bad("Invalid payload");

    const { email, password, name, role } = parsed.data;

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) return bad("Email already exists", 409);

    const hashed = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: { email, password: hashed, name, role },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    return ok({ user }, 201);
  } catch (e) {
    return server(e);
  }
}
