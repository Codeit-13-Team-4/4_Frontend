import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationsProject } from "../api/applicationsProject";
export function useApplyProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applicationsProject,
    meta: {
      successMessage: "프로젝트 지원에 성공했습니다.",
      errorMessage: {
        404: "존재하지 않는 프로젝트입니다.",
        409: "이미 지원한 프로젝트입니다.",
      },
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectList"] });
    },
  });
}
