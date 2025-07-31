// hooks/use-current-role.ts
"use client";

import { UserRole } from "@/lib/enums/roles";
import { useEffect, useState } from "react";


export const useCurrentRole = (): UserRole | null => {
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("authUser");
      if (storedUser) {
        try {
          // const user = JSON.parse(storedUser);
          // setRole(user.isAdmin ? "ADMIN" : "USER");
        } catch (error) {
          console.error("Failed to parse authUser from localStorage");
          // setRole(null);
        }
      }
    }
  }, []);

  return role;
};
