import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateProjectsDetail,
  type UpdateProjectDetailParams,
} from "@/features/projects/edit/api/updateProjectsDetail";
import { projectKeys } from "@/features/projects/model";

type UpdateVariables = Omit<UpdateProjectDetailParams, "projectId">;

export function useUpdateProjectsDetail(projectId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (variables: UpdateVariables) =>
      updateProjectsDetail({ projectId, ...variables }),
    meta: { successMessage: "프로젝트가 수정되었습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(projectId),
      });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}
