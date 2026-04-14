import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChallengeMember } from "../api/deleteChallengeMember";
import { challengeKeys } from "@/features/challenges/model/challenges.queryKey";

export function useDeleteChallengeMember(challengeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (targetUserId: number) =>
      deleteChallengeMember({ challengeId, targetUserId }),
    meta: { successMessage: "멤버를 내보냈습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: challengeKeys.members(challengeId),
      });
      queryClient.invalidateQueries({
        queryKey: challengeKeys.detail(challengeId),
      });
    },
  });
}
