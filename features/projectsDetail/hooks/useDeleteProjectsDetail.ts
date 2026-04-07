import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectsDetail } from "@/features/projectsDetail/api/deleteProjectsDetail";
import { projectKeys } from "@/features/projects/model/projects.queryKey";

export function useDeleteProjectsDetail(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteProjectsDetail(projectId),
    meta: { successMessage: "프로젝트가 삭제되었습니다." },
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: projectKeys.detail(projectId),
      });
      queryClient.invalidateQueries({
        queryKey: projectKeys.lists(),
      });
    },
  });
}
