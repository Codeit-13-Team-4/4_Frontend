import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectsDetail } from "@/features/projectsDetail/api/deleteProjectsDetail";

export function useDeleteProjectsDetail(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProjectsDetail(projectId),
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["projects", projectId],
      });
    },
  });
}
