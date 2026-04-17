import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editVerification } from "../api/editVerifications";
import {
  VerificationsIdProps,
  verificationsKeys,
  VerificationsPayload,
} from "@/features/challenges/verifications/model";

export function useEditVerifications({
  challengeId,
  verificationId,
}: VerificationsIdProps) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: VerificationsPayload) => {
      return editVerification({ challengeId, verificationId }, payload);
    },
    meta: { successMessage: "인증이 수정되었습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: verificationsKeys.detail({
          challengeId,
          verificationId,
        }),
      });

      queryClient.invalidateQueries({
        queryKey: verificationsKeys.lists(),
      });
    },
  });
}
