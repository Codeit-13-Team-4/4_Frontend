import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationsProject } from "../api/applicationsProject";
export function useApplyProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applicationsProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projectList"] });
    },
  });
}
