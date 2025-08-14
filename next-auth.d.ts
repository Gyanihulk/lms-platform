// next-auth.d.ts
import { RoleEnum } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: RoleEnum; // ✅ scalar enum
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: RoleEnum;
  }
}
