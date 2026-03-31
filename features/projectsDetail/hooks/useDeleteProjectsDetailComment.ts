import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectsDetailComment } from "@/features/projectsDetail/api/deleteProjectsDetailComment";

export function useDeleteProjectsDetailComment(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) =>
      deleteProjectsDetailComment({ projectId, commentId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", "comments", projectId],
      });
    },
  });
}
