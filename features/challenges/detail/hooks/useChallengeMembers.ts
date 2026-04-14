import { useQuery } from "@tanstack/react-query";
import { getChallengeMembers } from "../api/getChallengeMembers";
import { challengeKeys } from "@/features/challenges/model/challenges.queryKey";

export function useChallengeMembers(
  challengeId: number,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: challengeKeys.members(challengeId),
    queryFn: () => getChallengeMembers({ challengeId }),
    ...options,
  });
}
