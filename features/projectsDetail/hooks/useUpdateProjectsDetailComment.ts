import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectsDetailComment } from "@/features/projectsDetail/api/updateProjectsDetailComment";
import { projectKeys } from "@/features/projects/model/projects.queryKey";

interface UpdateCommentVariables {
  commentId: number;
  content: string;
}

export function useUpdateProjectsDetailComment(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: UpdateCommentVariables) =>
      updateProjectsDetailComment({ projectId, commentId, content }),
    meta: { successMessage: "댓글이 수정되었습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.comments(projectId),
      });
    },
  });
}
