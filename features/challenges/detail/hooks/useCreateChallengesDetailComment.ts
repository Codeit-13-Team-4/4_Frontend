import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChallengesDetailComment } from "@/features/challenges/detail/api/createChallengesDetailComment";
import { challengeKeys } from "@/features/challenges/model/challenges.queryKey";

export function useCreateChallengesDetailComment(challengeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      createChallengesDetailComment({ challengeId, content }),
    meta: { successMessage: "댓글이 작성되었습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: challengeKeys.comments(challengeId),
      });
    },
  });
}
