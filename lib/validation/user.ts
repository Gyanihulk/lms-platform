import { z } from "zod";
import { RoleEnum } from "@prisma/client";

export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  role: z.nativeEnum(RoleEnum),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  role: z.nativeEnum(RoleEnum).optional(),
  password: z.string().min(6).optional(),
});

export const listUsersQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  pageSize: z.coerce.number().min(1).max(100).default(20),
  q: z.string().optional(),
});
