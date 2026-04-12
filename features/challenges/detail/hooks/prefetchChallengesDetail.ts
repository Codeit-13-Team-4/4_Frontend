import { getQueryClient } from "@/app/providers/getQueryClient";
import { challengeKeys } from "@/features/challenges/model/challenges.queryKey";
import { getChallengesDetailServer } from "@/features/challenges/detail/api/getChallengesDetail.server";

export async function prefetchChallengesDetail(challengeId: number) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: challengeKeys.detail(challengeId),
    queryFn: () => getChallengesDetailServer(challengeId),
  });

  return queryClient;
}
