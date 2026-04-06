import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectsDetail } from "@/features/projectsDetail/api/deleteProjectsDetail";

export function useDeleteProjectsDetail(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProjectsDetail(projectId),
    meta: { successMessage: "프로젝트가 삭제되었습니다." },
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ["projects", projectId],
      });
      queryClient.invalidateQueries({
        queryKey: ["projectList"],
      });
    },
  });
}
