"use client";

import { useEffect } from "react";
import { getMe } from "@/features/auth/api/getMe";
import { useQuery } from "@tanstack/react-query";
import { useClearUser, useSetUser } from "@/features/auth/model/authStore";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useSetUser();
  const clearUser = useClearUser();

  const { data: user } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (user) {
      setUser(user);
    } else {
      clearUser();
    }
  }, [user, setUser, clearUser]);

  return <>{children}</>;
}
