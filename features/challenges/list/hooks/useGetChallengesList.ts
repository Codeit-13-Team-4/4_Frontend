"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getChallengesList } from "@/features/challenges/list/api/getChallengesList";
import { ChallengesFilter } from "@/features/challenges/model";
import { challengeKeys } from "@/features/challenges/model/challenges.queryKey";

const LIMIT = 10;

export const useGetChallengesList = (filters: ChallengesFilter = {}) => {
  return useInfiniteQuery({
    queryKey: challengeKeys.list(filters),
    queryFn: ({ pageParam }) => {
      return getChallengesList({
        ...filters,
        page: pageParam,
        limit: LIMIT,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, hasNext } = lastPage.pagination;

      return hasNext ? page + 1 : undefined;
    },
    throwOnError: true,
  });
};
