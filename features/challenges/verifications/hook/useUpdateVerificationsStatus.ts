import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UpdateVerificationStatusRequest,
  VerificationsIdProps,
  verificationsKeys,
} from "@/features/challenges/verifications/model";
import { updateVerificationStatus } from "../api/updateVerificationsStatus";

export function useUpdateVerificationStatus({
  challengeId,
  verificationId,
}: VerificationsIdProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateVerificationStatusRequest) => {
      return updateVerificationStatus({ challengeId, verificationId }, payload);
    },
    meta: { successMessage: "인증 상태가 변경되었습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: verificationsKeys.lists(),
      });
    },
  });
}
