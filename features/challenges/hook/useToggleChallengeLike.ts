import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toggleChallengeLike } from "@/features/challenges/api/toggleChallengeLike";
import type { ChallengesDetail } from "@/features/challenges/detail/model/challengesDetail";
import { challengeKeys } from "@/features/challenges/model/challenges.queryKey";
import { ChallengesResponse } from "@/features/challenges/model";

export function useToggleChallengeLike(challengeId: number) {
  const queryClient = useQueryClient();
  const queryKey = challengeKeys.detail(challengeId);

  return useMutation({
    mutationFn: (currentLiked: boolean) =>
      toggleChallengeLike(challengeId, currentLiked),
    onMutate: async (currentLiked) => {
      await queryClient.cancelQueries({ queryKey });
      await queryClient.cancelQueries({ queryKey: challengeKeys.lists() });

      const previous = queryClient.getQueryData<ChallengesDetail>(queryKey);
      const previousLists = queryClient.getQueriesData({
        queryKey: challengeKeys.lists(),
      });

      queryClient.setQueryData<ChallengesDetail>(queryKey, (old) =>
        old ? { ...old, isLiked: !currentLiked } : old,
      );

      queryClient.setQueriesData<InfiniteData<ChallengesResponse>>(
        { queryKey: challengeKeys.list() },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.map((challenge) =>
                challenge.id === challengeId
                  ? { ...challenge, isLiked: !challenge.isLiked }
                  : challenge,
              ),
            })),
          };
        },
      );

      return { previous, previousLists };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
      if (context?.previousLists) {
        context.previousLists.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: challengeKeys.lists() });
    },
  });
}
