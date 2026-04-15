"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import getMyChallenges from "../api/getMyChallenges";
import { MyChallengesParams, MyRoleType } from "../model/mypage.types";
import { mypageKeys } from "../model/mypage.queryKey";
import { MyApplicationStatusType } from "../model/mypage.types";

const LIMIT = 10;

export const useGetMyChallenges = (role: MyRoleType, filterValue: string) => {
  const applicationStatus =
    role === "MEMBER" ? (filterValue as MyApplicationStatusType) : undefined;
  const status = role === "HOST" ? filterValue : undefined;

  const params: MyChallengesParams = {
    ...(role === "HOST" && { isHost: true }),
    ...(status && { status: status as MyChallengesParams["status"] }),
    ...(applicationStatus && { applicationStatus }),
  };

  return useInfiniteQuery({
    queryKey: [...mypageKeys.challengeList(role, filterValue), params],
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
