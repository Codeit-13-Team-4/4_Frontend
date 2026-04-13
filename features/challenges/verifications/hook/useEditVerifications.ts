import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editVerification } from "../api/editVerifications";
import { verificationsKeys } from "../model";

export function useEditVerifications(
  challengeId: number,
  verificationId: number,
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { content: string; imageUrls: string[] }) =>
      editVerification(challengeId, verificationId, payload),
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
