import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/features/auth/api/getMe";
import { authKeys } from "@/features/auth/model/auth.queryKey";

export function useUserData() {
  return useQuery({
    queryKey: authKeys.me(),
    queryFn: getMe,
    staleTime: Infinity,
  });
}
