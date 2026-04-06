import { useQuery } from "@tanstack/react-query";
import { getChallengesDetail } from "../api/getChallengesDetail";

export function useChallengesDetail(id: number) {
  return useQuery({
    queryKey: ["challenges", id],
    queryFn: () => getChallengesDetail(id),
    staleTime: 1000 * 60 * 5,
    throwOnError: true,
  });
}
