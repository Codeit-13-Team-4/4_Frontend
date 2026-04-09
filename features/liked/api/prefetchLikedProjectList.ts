import { getQueryClient } from "@/app/providers/getQueryClient";
import type { LikedProjectFilter } from "@/features/liked/model";
import { likedProjectKeys } from "@/features/liked/model";
import { getLikedProjectListServer } from "./getLikedProjectList.server";

export async function prefetchLikedProjectList(filters: LikedProjectFilter) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: likedProjectKeys.list(filters),
    queryFn: ({ pageParam = 0 }) =>
      getLikedProjectListServer({
        ...filters,
        start: pageParam,
        perPage: 10,
      }),
    initialPageParam: 0,
  });

  return queryClient;
}
