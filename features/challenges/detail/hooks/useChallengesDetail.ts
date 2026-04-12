import { useSuspenseQuery } from "@tanstack/react-query";
import { getChallengesDetail } from "@/features/challenges/detail/api/getChallengesDetail";
import { challengeKeys } from "@/features/challenges/model/challenges.queryKey";

export function useChallengesDetail(id: number) {
  return useSuspenseQuery({
    queryKey: challengeKeys.detail(id),
    queryFn: () => getChallengesDetail(id),
    staleTime: 1000 * 60 * 5,
  });
}
