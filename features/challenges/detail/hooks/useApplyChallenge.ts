import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyChallenge } from "@/features/challenges/detail/api/applyChallenge";
import { challengeKeys } from "@/features/challenges/model/challenges.queryKey";

export function useApplyChallenge(challengeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, motivation }: { name: string; motivation: string }) =>
      applyChallenge({ challengeId, name, motivation }),
    meta: {
      errorMessage: {
        404: "존재하지 않는 챌린지입니다.",
        409: "이미 신청한 챌린지입니다.",
      },
    },
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
