import { ProjectFilter } from "../model";
import { getQueryClient } from "@/app/providers/getQueryClient";
import { getProjectList } from "./getProjectList";

export async function prefetchProjectList(filters: ProjectFilter) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["projectList", filters],
    queryFn: ({ pageParam = 0 }) =>
      getProjectList({ ...filters, start: pageParam, perPage: 10 }),
    initialPageParam: 0,
  });
  return queryClient;
}
