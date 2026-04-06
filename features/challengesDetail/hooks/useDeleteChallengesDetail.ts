import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChallengesDetail } from "@/features/challengesDetail/api/deleteChallengesDetail";

export function useDeleteChallengesDetail(challengeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteChallengesDetail(challengeId),
    meta: { successMessage: "챌린지가 삭제되었습니다." },
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
