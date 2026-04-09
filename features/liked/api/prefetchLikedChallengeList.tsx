import { getQueryClient } from "@/app/providers/getQueryClient";
import { getLikedChallengeListServer } from "./getLikedChallengeList.server";
import type { LikedChallengeFilter } from "@/features/liked/model";
import { likedChallengeKeys } from "@/features/liked/model";

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
        perPage: 10,
      }),
    initialPageParam: 0,
  });

  return queryClient;
}
