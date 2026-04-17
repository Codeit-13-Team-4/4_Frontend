import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  UpdateVerificationStatusRequest,
  VerificationsIdProps,
  verificationsKeys,
} from "@/features/challenges/verifications/model";
import { updateVerificationStatus } from "../api/updateVerificationsStatus";

export function useUpdateVerificationsStatus({
  challengeId,
  verificationId,
}: VerificationsIdProps) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateVerificationStatusRequest) => {
      return updateVerificationStatus({ challengeId, verificationId }, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: verificationsKeys.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: verificationsKeys.details(),
      });
      queryClient.invalidateQueries({
        queryKey: verificationsKeys.memberProgressList({ challengeId }),
      });
    },
  });
}
