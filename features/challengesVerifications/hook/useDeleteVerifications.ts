import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteVerifications } from "../api/deleteVerifications";
import { verificationsKeys } from "../model";

export function useDeleteVerifications({
  challengeId,
  verificationId,
}: {
  challengeId: number;
  verificationId: number;
}) {
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
