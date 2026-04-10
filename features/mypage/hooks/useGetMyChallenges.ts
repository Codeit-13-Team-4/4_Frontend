"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import getMyChallenges from "../api/getMyChallenges";
import { MyChallengesParams, MyRoleType } from "../model/mypage.types";
import { mypageKeys } from "../model/mypage.queryKey";

const LIMIT = 10;

export const useGetMyChallenges = (role: MyRoleType, status: string) => {
  const params: MyChallengesParams = {
    ...(role === "MEMBER" && { isMember: true }),
    ...(role === "HOST" && { isHost: true }),
    ...(role === "PENDING" && { hasPendingApplication: true }),
    ...(status && { status: status as MyChallengesParams["status"] }),
  };

  return useInfiniteQuery({
    queryKey: [...mypageKeys.challengeList(role, status), params],
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
