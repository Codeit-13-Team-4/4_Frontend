import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectsDetailComment } from "@/features/projectsDetail/api/updateProjectsDetailComment";
import { updateChallengesDetailComment } from "@/features/challenges/detail/api/updateChallengesDetailComment";
import { mypageKeys } from "../model/mypage.queryKey";
import type { MyComment } from "../model/mypage.types";

interface UpdateMyCommentVariables {
  commentId: number;
  content: string;
  type: MyComment["type"];
  targetId: number;
}

export function useUpdateMyComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
      type,
      targetId,
    }: UpdateMyCommentVariables) => {
      if (type === "project") {
        return updateProjectsDetailComment({
          projectId: targetId,
          commentId,
          content,
        });
      }
      return updateChallengesDetailComment({
        challengeId: targetId,
        commentId,
        content,
      });
    },
    meta: { successMessage: "댓글이 수정되었습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: mypageKeys.comments() });
    },
  });
}
