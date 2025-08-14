import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { db } from "@/lib/db";
import { RoleEnum } from "@prisma/client"; // ✅ only the enum

export const authConfig: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null;

        const user = await db.user.findUnique({
          where: { email: creds.email },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            role: true, // Prisma enum RoleEnum on your User model
          },
        });
        if (!user || !user.password) return null;

        const ok = await compare(creds.password, user.password);
        if (!ok) return null;

        // ✅ return a plain object for the JWT; keep role as RoleEnum (scalar)
        return {
          id: user.id,
          email: user.email,
          name: user.name ?? undefined,
          role: user.role as RoleEnum,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id as string;
        token.role = ((user as any).role ?? RoleEnum.STUDENT) as RoleEnum; // ✅ enum in JWT
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = (token.role as RoleEnum) ?? RoleEnum.STUDENT; // ✅ enum in Session
      }
      return session;
    },
  },
  pages: { signIn: "/auth/login" },
};
