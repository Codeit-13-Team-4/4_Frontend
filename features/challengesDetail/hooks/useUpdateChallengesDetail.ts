import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateChallengesDetail,
  type UpdateChallengesDetailParams,
} from "@/features/challengesDetail/api/updateChallengesDetail";

type UpdateVariables = Omit<UpdateChallengesDetailParams, "challengeId">;

export function useUpdateChallengesDetail(challengeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: UpdateVariables) =>
      updateChallengesDetail({ challengeId, ...variables }),
    meta: { successMessage: "챌린지가 수정되었습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["challenges", challengeId],
      });

      queryClient.invalidateQueries({
        queryKey: ["challengesList"],
      });
    },
  });
}
