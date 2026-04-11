import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChallengesDetailComment } from "@/features/challenges/detail/api/updateChallengesDetailComment";
import { challengeKeys } from "@/features/challenges/model/challenges.queryKey";

interface UpdateCommentVariables {
  commentId: number;
  content: string;
}

export function useUpdateChallengesDetailComment(challengeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: UpdateCommentVariables) =>
      updateChallengesDetailComment({ challengeId, commentId, content }),
    meta: { successMessage: "댓글이 수정되었습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: challengeKeys.comments(challengeId),
      });
    },
  });
}
