"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getLikedProjectList } from "../api/getLikedProjectList";
import type { LikedProjectFilter } from "../model";
import { likedProjectKeys } from "../model";

const PER_PAGE = 10;

export function useGetLikedProjectList(filters: LikedProjectFilter = {}) {
  return useInfiniteQuery({
    queryKey: likedProjectKeys.list(filters),
    queryFn: ({ pageParam }) =>
      getLikedProjectList({
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
