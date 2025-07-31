// app/context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

type AuthContextType = {
  userId: string | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  userId: null,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      setUserId(session?.user?.id || null);
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ userId, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const auth = () => useContext(AuthContext);
