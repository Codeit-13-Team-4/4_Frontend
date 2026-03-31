import { useInfiniteQuery } from "@tanstack/react-query";
import { getProjectsDetailComments } from "@/features/projectsDetail/api/getProjectsDetailComment";

const PER_PAGE = 10;

export function useProjectsDetailComments(projectId: number) {
  return useInfiniteQuery({
    queryKey: ["projects", "comments", projectId],
    queryFn: ({ pageParam }) =>
      getProjectsDetailComments({
        projectId,
        start: pageParam,
        perPage: PER_PAGE,
        sort: "createdAt",
        order: "DESC",
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const nextStart = lastPageParam + PER_PAGE;
      return nextStart < lastPage.total ? nextStart : undefined;
    },
  });
}
