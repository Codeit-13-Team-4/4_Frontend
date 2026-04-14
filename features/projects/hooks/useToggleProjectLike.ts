import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleProjectLike } from "../api/toggleProjectLike";
import type { ProjectDetail } from "@/features/projects/model";
import { projectKeys } from "@/features/projects/model";

export function useToggleProjectLike(projectId: number) {
  const queryClient = useQueryClient();
  const queryKey = projectKeys.detail(projectId);

  return useMutation({
    mutationFn: (currentLiked: boolean) =>
      toggleProjectLike(projectId, currentLiked),
    meta: {
      errorMessage: {
        404: "존재하지 않는 프로젝트입니다.",
        409: "이미 처리된 요청입니다.",
      },
    },
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
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}
