// hooks/use-current-role.ts
"use client";

import type { UserRole } from "@/lib/enums/roles";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const useCurrentRole = (): UserRole | null => {
  const { data: session, status } = useSession();
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {


    const sessionRole = (session?.user as any)?.role as UserRole | undefined;
    if (sessionRole) {
      setRole(sessionRole);
      return; // ✅ prefer session if available
    }

    // ---- LocalStorage fallback ----
    if (typeof window === "undefined") {
      console.warn("[useCurrentRole] window is undefined (probably SSR)");
      return;
    }

    const storedUser = localStorage.getItem("authUser");

    if (!storedUser) {
      console.warn("[useCurrentRole] no authUser found in localStorage");
      return;
    }

    try {
      const parsed = JSON.parse(storedUser);

      if (parsed?.role) {
        setRole(parsed.role as UserRole);
      } else {
      }
    } catch (error) {
      console.error("[useCurrentRole] Failed to parse authUser JSON:", error);
      setRole(null);
    }
  }, [session, status]);

  console.log("[useCurrentRole] returning role:", role);
  return role;
};
