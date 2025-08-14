// lib/auth/current-user.ts
import "server-only";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth/config"; // Adjust path as needed

export async function currentUser() {
  const session = await getServerSession(authConfig);

  if (!session || !session.user) {
    return null;
  }

  return session.user; // { id, email, name, role } — thanks to your callback
}
