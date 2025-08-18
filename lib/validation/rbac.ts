import { z } from "zod";
import { AppliesToType, RoleType } from "@prisma/client";

export const createRoleSchema = z.object({
  name: z.string().min(2),
  type: z.nativeEnum(RoleType).default("CUSTOM"),
  parentId: z.string().optional().nullable(),
  appliesTo: z.nativeEnum(AppliesToType).default("GLOBAL"),
  appliesToId: z.string().optional().nullable(),
});

export const updateRoleSchema = createRoleSchema.partial();

export const assignUserRoleSchema = z.object({
  userId: z.string(),
  roleId: z.string(),
  scopeType: z.nativeEnum(AppliesToType).optional().nullable(),
  scopeId: z.string().optional().nullable(),
});
