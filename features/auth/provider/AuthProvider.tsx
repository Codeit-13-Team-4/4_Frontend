"use client";

import { useEffect } from "react";

import { getMe } from "@/features/auth/api/getMe";
import { useAuthStore } from "@/features/auth/model/authStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);
  const setInitialized = useAuthStore((state) => state.setInitialized);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch {
        clearUser();
      } finally {
        setInitialized(true);
      }
    };

    initializeAuth();
  }, [setUser, clearUser, setInitialized]);

  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}
