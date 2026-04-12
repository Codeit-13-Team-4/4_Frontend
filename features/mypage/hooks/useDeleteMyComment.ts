import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectsDetailComment } from "@/features/projectsDetail/api/deleteProjectsDetailComment";
import { deleteChallengesDetailComment } from "@/features/challenges/detail/api/deleteChallengesDetailComment";
import { mypageKeys } from "../model/mypage.queryKey";
import type { MyComment } from "../model/mypage.types";

interface DeleteMyCommentVariables {
  commentId: number;
  type: MyComment["type"];
  targetId: number;
}

export function useDeleteMyComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, type, targetId }: DeleteMyCommentVariables) => {
      if (type === "project") {
        return deleteProjectsDetailComment({ projectId: targetId, commentId });
      }
      return deleteChallengesDetailComment({
        challengeId: targetId,
        commentId,
      });
    },
    meta: { successMessage: "댓글이 삭제되었습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mypageKeys.comments() });
    },
  });
}
