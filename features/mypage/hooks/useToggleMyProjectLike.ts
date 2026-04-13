import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleProjectLike } from "@/features/projects/api/toggleProjectLike";
import { mypageKeys } from "../model/mypage.queryKey";
import type { MyProjectsResponse } from "../model/mypage.types";

export function useToggleMyProjectLike(projectId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (currentLiked: boolean) =>
      toggleProjectLike(projectId, currentLiked),
    onMutate: async (currentLiked) => {
      await queryClient.cancelQueries({ queryKey: mypageKeys.projects() });

      const queries = queryClient.getQueriesData<{
        pages: MyProjectsResponse[];
      }>({ queryKey: mypageKeys.projects() });

      queries.forEach(([queryKey, data]) => {
        if (!data) return;
        queryClient.setQueryData(queryKey, {
          ...data,
          pages: data.pages.map((page) => ({
            ...page,
            data: page.data.map((project) =>
              project.id === projectId
                ? { ...project, liked: !currentLiked }
                : project,
            ),
          })),
        });
      });

      return { queries };
    },
    onError: (_err, _vars, context) => {
      context?.queries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: mypageKeys.projects() });
    },
  });
}
