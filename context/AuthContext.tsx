// app/context/AuthContext.tsx
"use client";

import { createContext, useContext } from "react";
import { useSession } from "next-auth/react";

type AuthUser = {
  id: string;
  email?: string | null;
  name?: string | null;
  role?: string | null;
  image?: string | null;
} | null;

type AuthContextType = {
  userId: string | null;
  user: AuthUser;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  userId: null,
  user: null,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  const value: AuthContextType = {
    userId: session?.user?.id ?? null,
    user: session?.user ?? null,
    isLoading: status === "loading",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const auth = () => useContext(AuthContext);
