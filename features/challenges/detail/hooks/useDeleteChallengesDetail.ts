import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChallengesDetail } from "@/features/challenges/detail/api/deleteChallengesDetail";
import { challengeKeys } from "@/features/challenges/model/challenges.queryKey";

export function useDeleteChallengesDetail(challengeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteChallengesDetail(challengeId),
    meta: { successMessage: "챌린지가 삭제되었습니다." },
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: challengeKeys.detail(challengeId),
      });
      queryClient.invalidateQueries({
        queryKey: challengeKeys.lists(),
      });
    },
  });
}
