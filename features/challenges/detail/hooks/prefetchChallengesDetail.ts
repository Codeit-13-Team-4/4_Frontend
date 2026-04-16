import { getQueryClient } from "@/app/providers/getQueryClient";
import { challengeKeys } from "@/features/challenges/model/challenges.queryKey";
import { getChallengesDetailServer } from "@/features/challenges/detail/api/getChallengesDetail.server";
import { notFound } from "next/navigation";
import { ApiError } from "@/shared/lib/errors/ApiError";

export async function prefetchChallengesDetail(challengeId: number) {
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: challengeKeys.detail(challengeId),
      queryFn: () => getChallengesDetailServer(challengeId),
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  return queryClient;
}
