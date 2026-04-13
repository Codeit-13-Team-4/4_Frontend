import { ProjectFilter } from "@/features/projects/model";
import { getQueryClient } from "@/app/providers/getQueryClient";
import { getProjectListServer } from "./getProjectList.server";

export async function prefetchProjectList(filters: ProjectFilter) {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["projectList", filters],
    queryFn: ({ pageParam = 0 }) =>
      getProjectListServer({ ...filters, start: pageParam, perPage: 10 }),
    initialPageParam: 0,
  });
  return queryClient;
}
