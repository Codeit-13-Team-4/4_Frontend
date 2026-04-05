import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChallengesDetailComment } from "@/features/challengesDetail/api/deleteChallengesDetailComment";

export function useDeleteChallengesDetailComment(challengeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) =>
      deleteChallengesDetailComment({ challengeId, commentId }),
    meta: { successMessage: "댓글이 삭제되었습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["challenges", "comments", challengeId],
      });
    },
  });
}
