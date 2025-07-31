// stores/useAuthStore.ts
import { create } from "zustand";

type User = {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isAdmin: boolean;
  isConfirmed: boolean;
};

type AuthState = {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  hydrate: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setAuth: (user, token) => {
    localStorage.setItem("authUser", JSON.stringify(user));
    localStorage.setItem("authToken", token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");
    set({ user: null, token: null });
  },
  hydrate: () => {
    const storedUser = localStorage.getItem("authUser");
    const storedToken = localStorage.getItem("authToken");
    if (storedUser && storedToken) {
      set({ user: JSON.parse(storedUser), token: storedToken });
    }
  }
}));
