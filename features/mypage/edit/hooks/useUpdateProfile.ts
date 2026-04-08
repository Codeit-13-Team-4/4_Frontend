import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/updateProfile";
import { authKeys } from "@/features/auth/model/auth.queryKey";
import { useRouter } from "next/navigation";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: updateProfile,
    meta: { successMessage: "프로필이 수정되었습니다 " },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.me() });
      router.push("/mypage");
    },
  });
}
