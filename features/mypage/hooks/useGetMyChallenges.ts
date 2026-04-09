"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import getMyChallenges from "../api/getMyChallenges";
import { MyChallengesParams } from "../model/mypage.types";
import { mypageKeys } from "../model/mypage.queryKey";

const LIMIT = 10;

export const useGetMyChallenges = (params: MyChallengesParams) => {
  return useInfiniteQuery({
    queryKey: mypageKeys.challengeList(params),
    queryFn: ({ pageParam }) => {
      return getMyChallenges({
        ...params,
        page: pageParam,
        limit: LIMIT,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { page, hasNext } = lastPage.pagination;

      return hasNext ? page + 1 : undefined;
    },
  });
};
