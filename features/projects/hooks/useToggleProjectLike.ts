import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toggleProjectLike } from "../api/toggleProjectLike";
import type {
  ProjectDetail,
  ProjectsResponse,
} from "@/features/projects/model";
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
      await queryClient.cancelQueries({ queryKey: projectKeys.lists() });

      const previous = queryClient.getQueryData<ProjectDetail>(queryKey);
      const previousLists = queryClient.getQueriesData({
        queryKey: projectKeys.lists(),
      });

      queryClient.setQueryData<ProjectDetail>(queryKey, (old) =>
        old ? { ...old, liked: !currentLiked } : old,
      );
      queryClient.setQueriesData<InfiniteData<ProjectsResponse>>(
        { queryKey: projectKeys.lists() },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.map((project) =>
                project.id === projectId
                  ? { ...project, liked: !project.liked }
                  : project,
              ),
            })),
          };
        },
      );
      return { previous, previousLists };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
      if (context?.previousLists) {
        context.previousLists.forEach(([key, data]) => {
          queryClient.setQueryData(key, data);
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}
