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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId],
      });
    },
  });
}
