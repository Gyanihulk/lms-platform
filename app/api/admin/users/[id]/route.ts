import { db } from "@/lib/db";
import { bad, ok, server } from "@/app/api/_lib/http";
import { requireAdmin } from "@/app/api/_lib/auth";

import bcrypt from "bcryptjs";
import { updateUserSchema } from "@/lib/validation/user";

type Ctx = { params: { id: string } };

export async function GET(_: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const user = await db.user.findUnique({
      where: { id: params.id },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    if (!user) return bad("Not found", 404);
    return ok({ user });
  } catch (e) {
    return server(e);
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const body = await req.json();
    const parsed = updateUserSchema.safeParse(body);
    if (!parsed.success) return bad("Invalid payload");

    const data: any = { ...parsed.data };
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const user = await db.user.update({
      where: { id: params.id },
      data,
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });

    return ok({ user });
  } catch (e) {
    return server(e);
  }
}

export async function DELETE(_: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    await db.user.delete({ where: { id: params.id } });
    return ok({ success: true });
  } catch (e) {
    return server(e);
  }
}
