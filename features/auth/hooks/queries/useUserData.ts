import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/features/auth/api/getMe";

export function useUserData() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    staleTime: 0,
    refetchOnMount: "always",
  });
}
