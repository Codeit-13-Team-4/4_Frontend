"use client";

import { useEffect } from "react";

import { getMe } from "@/features/auth/api/getMe";
import { authSelectors, useAuthStore } from "@/features/auth/model/authStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useAuthStore(authSelectors.setUser);
  const clearUser = useAuthStore(authSelectors.clearUser);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch {
        clearUser();
      }
    };

    initializeAuth();
  }, [setUser, clearUser]);

  return <>{children}</>;
}
