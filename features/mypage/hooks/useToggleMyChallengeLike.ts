import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleChallengeLike } from "@/features/challenges/api/toggleChallengeLike";
import { mypageKeys } from "../model/mypage.queryKey";
import type { MyChallengesResponse } from "../model/mypage.types";

export function useToggleMyChallengeLike(challengeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (currentLiked: boolean) =>
      toggleChallengeLike(challengeId, currentLiked),
    onMutate: async (currentLiked) => {
      await queryClient.cancelQueries({ queryKey: mypageKeys.challenges() });

      const queries = queryClient.getQueriesData<{
        pages: MyChallengesResponse[];
      }>({ queryKey: mypageKeys.challenges() });

      queries.forEach(([queryKey, data]) => {
        if (!data) return;
        queryClient.setQueryData(queryKey, {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            data: page.data.map((challenge) =>
              challenge.id === challengeId
                ? { ...challenge, isLiked: !currentLiked }
                : challenge,
            ),
          })),
        });
      });

      return { queries };
    },
    onError: (_err, _vars, context) => {
      context?.queries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: mypageKeys.challenges() });
    },
  });
}
