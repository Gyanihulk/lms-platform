import { getServerSession } from "next-auth";

import { RoleEnum } from "@prisma/client";
import { bad } from "./http";
import { authConfig } from "@/lib/auth/config";

export async function requireAdmin() {
  const session = await getServerSession(authConfig);
  console.log(session,'api session')
  if (!session?.user) {
    return bad("Unauthorized", 401);
  }
  const role = session.user.role;
  const isAdmin = role === RoleEnum.SUPER_ADMIN || role === RoleEnum.ADMIN;

  if (!isAdmin) {
    return bad("Forbidden", 403);
  }

  return null; // allowed
}
