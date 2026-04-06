import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProjectsDetailComment } from "@/features/projectsDetail/api/createProjectsDetailComment";

export function useCreateProjectsDetailComment(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      createProjectsDetailComment({ projectId, content }),
    meta: { successMessage: "댓글이 작성되었습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", "comments", projectId],
      });
    },
  });
}
