"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { logout } from "../../api/logout";

interface UseLogoutOptions {
  onSuccess?: () => void;
}

export function useLogout(options?: UseLogoutOptions) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
      options?.onSuccess?.();
      router.push("/");
      router.refresh();
    },
  });
}
