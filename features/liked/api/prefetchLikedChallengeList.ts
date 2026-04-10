import { getQueryClient } from "@/app/providers/getQueryClient";
import type { LikedChallengeFilter } from "@/features/liked/model";
import { likedChallengeKeys } from "@/features/liked/model";
import { getLikedChallengeListServer } from "./getLikedChallengeList.server";
import { LIKED_PER_PAGE } from "./liked.constants";

export async function prefetchLikedChallengeList(
  filters: LikedChallengeFilter,
) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: likedChallengeKeys.list(filters),
    queryFn: ({ pageParam = 0 }) =>
      getLikedChallengeListServer({
        ...filters,
        start: pageParam,
        perPage: LIKED_PER_PAGE,
      }),
    initialPageParam: 0,
  });

  return queryClient;
}
