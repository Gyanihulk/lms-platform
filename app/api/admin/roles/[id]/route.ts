import { db } from "@/lib/db";
import { bad, ok, server } from "@/app/api/_lib/http";
import { requireAdmin } from "@/app/api/_lib/auth";
import { updateRoleSchema } from "@/lib/validation/rbac";

type Ctx = { params: { id: string } };

export async function GET(_: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const role = await db.role.findUnique({
      where: { id: params.id },
      include: { children: true, roleFuncs: true, userRoles: true },
    });
    if (!role) return bad("Not found", 404);
    return ok({ role });
  } catch (e) {
    return server(e);
  }
}

export async function PUT(req: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    const body = await req.json();
    const parsed = updateRoleSchema.safeParse(body);
    if (!parsed.success) return bad("Invalid payload");

    const role = await db.role.update({
      where: { id: params.id },
      data: parsed.data,
    });
    return ok({ role });
  } catch (e) {
    return server(e);
  }
}

export async function DELETE(_: Request, { params }: Ctx) {
  const guard = await requireAdmin();
  if (guard) return guard;

  try {
    await db.role.delete({ where: { id: params.id } });
    return ok({ success: true });
  } catch (e) {
    return server(e);
  }
}
