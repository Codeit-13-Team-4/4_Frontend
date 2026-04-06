import { getQueryClient } from "@/app/providers/getQueryClient";
import { ChallengesFilter } from "@/features/challenges/model";
import { getChallengesList } from "./getChallengesList";

export async function prefetchChallengesList(filters: ChallengesFilter) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["challengesList", filters],
    queryFn: ({ pageParam = 0 }) =>
      getChallengesList({ ...filters, page: pageParam, limit: 10 }),
    initialPageParam: 0,
  });
  return queryClient;
}
