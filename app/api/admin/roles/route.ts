import { db } from "@/lib/db";
import { bad, ok, server } from "@/app/api/_lib/http";
import { requireAdmin } from "@/app/api/_lib/auth";
import { createRoleSchema } from "@/lib/validation/rbac";
import { NextRequest } from "next/server";
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
    const roles = await db.role.findMany({
      orderBy: { createdAt: "desc" },
      include: { children: true },
    });
    return ok({ roles });
  } catch (e) {
    return server(e);
  }
}

export async function POST(req: NextRequest) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const body = await req.json();
    const parsed = createRoleSchema.safeParse(body);
    if (!parsed.success) return bad("Invalid payload");

    const role = await db.role.create({ data: parsed.data });
    return ok({ role }, 201);
  } catch (e) {
    return server(e);
  }
}
