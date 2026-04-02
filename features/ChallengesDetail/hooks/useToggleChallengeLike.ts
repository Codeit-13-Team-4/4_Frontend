import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleChallengeLike } from "@/features/challengesDetail/api/toggleChallengeLike";
import type { ChallengesDetail } from "@/features/challengesDetail/types/challengesDetail";

export function useToggleChallengeLike(challengeId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["challenges", challengeId];

  return useMutation({
    mutationFn: (currentLiked: boolean) =>
      toggleChallengeLike(challengeId, currentLiked),
    onMutate: async (currentLiked) => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<ChallengesDetail>(queryKey);

      queryClient.setQueryData<ChallengesDetail>(queryKey, (old) =>
        old ? { ...old, isBookmarked: !currentLiked } : old,
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
    },
  });
}
