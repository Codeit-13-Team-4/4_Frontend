import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleChallengeLike } from "@/features/challengesDetail/api/toggleChallengeLike";
import type { ChallengesDetail } from "@/features/challengesDetail/types/challengesDetail";
import { challengeKeys } from "@/features/challenges/model/challenges.queryKey";

export function useToggleChallengeLike(challengeId: number) {
  const queryClient = useQueryClient();
  const queryKey = challengeKeys.detail(challengeId);

  return useMutation({
    mutationFn: (currentLiked: boolean) =>
      toggleChallengeLike(challengeId, currentLiked),
    onMutate: async (currentLiked) => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<ChallengesDetail>(queryKey);

      queryClient.setQueryData<ChallengesDetail>(queryKey, (old) =>
        old ? { ...old, isLiked: !currentLiked } : old,
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: challengeKeys.lists() });
    },
  });
}
