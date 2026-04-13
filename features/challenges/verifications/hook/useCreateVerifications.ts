import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVerifications } from "../api/createVerifications";
import { verificationsKeys } from "../model";

type CreateVerificationPayload = {
  content: string;
  imageUrls: string[];
};

export function useCreateVerifications(challengeId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateVerificationPayload) =>
      createVerifications(challengeId, payload),
    meta: { successMessage: "인증이 생성되었습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: verificationsKeys.list({ challengeId }),
      });
    },
  });
}
