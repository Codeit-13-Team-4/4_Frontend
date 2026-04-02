import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectsDetailComment } from "@/features/projectsDetail/api/updateProjectsDetailComment";

interface UpdateCommentVariables {
  commentId: number;
  content: string;
}

export function useUpdateProjectsDetailComment(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: UpdateCommentVariables) =>
      updateProjectsDetailComment({ projectId, commentId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", "comments", projectId],
      });
    },
  });
}
