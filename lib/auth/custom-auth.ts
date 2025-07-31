// lib/auth/auth.ts
import { currentUser } from "./current-user";

export async function  auth() {
  const user = await currentUser();
  return { userId: user?.id ?? null };
}
