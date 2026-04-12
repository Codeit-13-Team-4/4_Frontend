import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyChallenge } from "@/features/challenges/detail/api/applyChallenge";
import { challengeKeys } from "@/features/challenges/model/challenges.queryKey";

export function useApplyChallenge(challengeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, motivation }: { name: string; motivation: string }) =>
      applyChallenge({ challengeId, name, motivation }),
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
