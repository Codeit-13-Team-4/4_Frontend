import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVerifications } from "../api/deleteVerifications";
import {
  VerificationsIdProps,
  verificationsKeys,
} from "@/features/challenges/verifications/model";

export function useDeleteVerifications({
  challengeId,
  verificationId,
}: VerificationsIdProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      deleteVerifications({
        challengeId,
        verificationId,
      }),
    meta: { successMessage: "인증이 삭제되었습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: verificationsKeys.list({ challengeId }),
      });
    },
  });
}
