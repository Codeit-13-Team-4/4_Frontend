import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectsDetailComment } from "../api/deleteProjectsDetailComment";
import { projectKeys } from "@/features/projects/model";

export function useDeleteProjectsDetailComment(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) =>
      deleteProjectsDetailComment({ projectId, commentId }),
    meta: { successMessage: "댓글이 삭제되었습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.comments(projectId),
      });
    },
  });
}
