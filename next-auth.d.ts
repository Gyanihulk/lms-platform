import NextAuth, { DefaultSession } from "next-auth";
import { RoleEnum } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: RoleEnum;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: RoleEnum;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: RoleEnum;
  }
}
