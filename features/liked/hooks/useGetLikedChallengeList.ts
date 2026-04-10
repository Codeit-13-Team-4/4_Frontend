"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { LIKED_PER_PAGE } from "../api/liked.constants";
import { getLikedChallengeList } from "../api/getLikedChallengeList";
import type { LikedChallengeFilter } from "../model";
import { likedChallengeKeys } from "../model";

export function useGetLikedChallengeList(filters: LikedChallengeFilter = {}) {
  return useInfiniteQuery({
    queryKey: likedChallengeKeys.list(filters),
    queryFn: ({ pageParam }) =>
      getLikedChallengeList({
        ...filters,
        start: pageParam,
        perPage: LIKED_PER_PAGE,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextStart = allPages.length * LIKED_PER_PAGE;

      return nextStart < lastPage.total ? nextStart : undefined;
    },
    throwOnError: false,
  });
}
