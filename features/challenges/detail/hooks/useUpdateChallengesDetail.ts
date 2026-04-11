import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateChallengesDetail,
  type UpdateChallengesDetailParams,
} from "@/features/challenges/detail/api/updateChallengesDetail";
import { challengeKeys } from "@/features/challenges/model/challenges.queryKey";

type UpdateVariables = Omit<UpdateChallengesDetailParams, "challengeId">;

export function useUpdateChallengesDetail(challengeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: UpdateVariables) =>
      updateChallengesDetail({ challengeId, ...variables }),
    meta: { successMessage: "챌린지가 수정되었습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: challengeKeys.detail(challengeId),
      });

      queryClient.invalidateQueries({
        queryKey: challengeKeys.lists(),
      });
    },
  });
}
