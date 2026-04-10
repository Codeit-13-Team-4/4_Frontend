"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { LIKED_PER_PAGE } from "../api/liked.constants";
import { getLikedProjectList } from "../api/getLikedProjectList";
import type { LikedProjectFilter } from "../model";
import { likedProjectKeys } from "../model";

export function useGetLikedProjectList(filters: LikedProjectFilter = {}) {
  return useInfiniteQuery({
    queryKey: likedProjectKeys.list(filters),
    queryFn: ({ pageParam }) =>
      getLikedProjectList({
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
