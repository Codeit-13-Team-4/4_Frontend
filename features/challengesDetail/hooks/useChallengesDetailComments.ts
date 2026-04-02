import { useInfiniteQuery } from "@tanstack/react-query";
import { getChallengesDetailComments } from "@/features/challengesDetail/api/getChallengesDetailComment";

const PER_PAGE = 10;

export function useChallengesDetailComments(challengeId: number) {
  return useInfiniteQuery({
    queryKey: ["challenges", "comments", challengeId],
    queryFn: ({ pageParam }) =>
      getChallengesDetailComments({
        challengeId,
        start: pageParam,
        perPage: PER_PAGE,
        sort: "createdAt",
        order: "DESC",
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const nextStart = lastPageParam + PER_PAGE;
      return nextStart < lastPage.total ? nextStart : undefined;
    },
  });
}
