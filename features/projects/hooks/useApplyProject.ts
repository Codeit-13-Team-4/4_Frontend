import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationsProject } from "../api/applicationsProject";
export function useApplyProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applicationsProject,
    meta: { successMessage: "프로젝트 지원에 성공했습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectList"] });
    },
  });
}
