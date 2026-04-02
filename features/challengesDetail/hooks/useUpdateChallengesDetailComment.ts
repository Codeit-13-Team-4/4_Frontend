import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChallengesDetailComment } from "@/features/challengesDetail/api/updateChallengesDetailComment";

interface UpdateCommentVariables {
  commentId: number;
  content: string;
}

export function useUpdateChallengesDetailComment(challengeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: UpdateCommentVariables) =>
      updateChallengesDetailComment({ challengeId, commentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["challenges", "comments", challengeId],
      });
    },
  });
}
