// lib/auth/current-user.ts
import "server-only";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { authConfig } from "@/lib/auth/config";
import { RoleEnum } from "@prisma/client";
import { cookies, headers } from "next/headers";

export async function currentUser() {
  // 1. Try normal session (cookie-based)
  const session = await getServerSession(authConfig);
  if (session?.user) {
    return {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name,
      role: session.user.role as RoleEnum,
    };
  }

  // 2. Try Bearer token (JWT-based)
  const authHeader = headers().get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = await getToken({
      req: { cookies: Object.fromEntries(cookies().getAll().map(c => [c.name, c.value])), headers: Object.fromEntries(headers()) } as any,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (token?.id) {
      return {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        role: token.role as RoleEnum,
      };
    }
  }

  return null; // No valid auth found
}
