"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getLikedChallengeList } from "../api/getLikedChallengeList";
import type { LikedChallengeFilter } from "../model";
import { likedChallengeKeys } from "../model";

const PER_PAGE = 10;

export function useGetLikedChallengeList(filters: LikedChallengeFilter = {}) {
  return useInfiniteQuery({
    queryKey: likedChallengeKeys.list(filters),
    queryFn: ({ pageParam }) =>
      getLikedChallengeList({
        ...filters,
        start: pageParam,
        perPage: PER_PAGE,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextStart = allPages.length * PER_PAGE;

      return nextStart < lastPage.total ? nextStart : undefined;
    },
    throwOnError: false,
  });
}
