import { getQueryClient } from "@/app/providers/getQueryClient";
import { ChallengesFilter } from "@/features/challenges/model";
import { getChallengesListServer } from "./getChallengesList.server";

export async function prefetchChallengesList(filters: ChallengesFilter) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["challengesList", filters],
    queryFn: ({ pageParam }) =>
      getChallengesListServer({ ...filters, page: pageParam, limit: 10 }),
    initialPageParam: 1,
  });
  return queryClient;
}
