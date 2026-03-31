import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProjectsDetailComment } from "@/features/projectsDetail/api/createProjectsDetailComment";

export function useCreateProjectsDetailComment(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      createProjectsDetailComment({ projectId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", "comments", projectId],
      });
    },
  });
}
