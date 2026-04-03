import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleProjectLike } from "@/features/projectsDetail/api/toggleProjectLike";
import type { ProjectDetail } from "@/features/projectsDetail/types/projectsDetail";

export function useToggleProjectLike(projectId: number) {
  const queryClient = useQueryClient();
  const queryKey = ["projects", projectId];

  return useMutation({
    mutationFn: (currentLiked: boolean) =>
      toggleProjectLike(projectId, currentLiked),
    onMutate: async (currentLiked) => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<ProjectDetail>(queryKey);

      queryClient.setQueryData<ProjectDetail>(queryKey, (old) =>
        old ? { ...old, liked: !currentLiked } : old,
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: ["projectList"] });
    },
  });
}
