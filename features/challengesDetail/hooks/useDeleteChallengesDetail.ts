import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChallengesDetail } from "@/features/challengesDetail/api/deleteChallengesDetail";

export function useDeleteChallengesDetail(challengeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteChallengesDetail(challengeId),
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["challenges", challengeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["challengesList"],
      });
    },
  });
}
