// lib/server/roles.ts (SERVER-ONLY)
import { Prisma, RoleEnum } from "@prisma/client";
import { z } from "zod";

// Type from Prisma
export type UserRole = RoleEnum;

// Runtime list (useful for select menus, guards, etc.)
export const ROLES = Object.values(RoleEnum) as UserRole[];

// Zod schema backed by Prisma enum
export const RoleSchema = z.nativeEnum(RoleEnum);

// Quick helpers
export const isRole = (value: unknown): value is UserRole =>
  typeof value === "string" && (ROLES as string[]).includes(value);

export const assertRole = (value: unknown): UserRole => RoleSchema.parse(value);
