import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateProjectsDetail,
  type UpdateProjectDetailParams,
} from "@/features/projectsDetail/api/updateProjectsDetail";

type UpdateVariables = Omit<UpdateProjectDetailParams, "projectId">;

export function useUpdateProjectsDetail(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: UpdateVariables) =>
      updateProjectsDetail({ projectId, ...variables }),
    meta: { successMessage: "프로젝트가 수정되었습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId],
      });

      queryClient.invalidateQueries({
        queryKey: ["projectList"],
      });
    },
  });
}
