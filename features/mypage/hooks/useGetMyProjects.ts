"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import getMyProjects from "../api/getMyProjects";
import { MyProjectsParams, MyRoleType } from "../model/mypage.types";
import { mypageKeys } from "../model/mypage.queryKey";

const PER_PAGE = 10;

export const useGetMyProjects = (role: MyRoleType, status: string) => {
  const params: MyProjectsParams = {
    ...(role === "MEMBER" && { isMember: true }),
    ...(role === "HOST" && { isHost: true }),
    ...(role === "PENDING" && { hasPendingApplication: true }),
    ...(status && { status: status as MyProjectsParams["status"] }),
  };

  return useInfiniteQuery({
    queryKey: [...mypageKeys.projectList(role, status), params],
    queryFn: ({ pageParam }) => {
      return getMyProjects({
        ...params,
        start: pageParam,
        perPage: PER_PAGE,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextStart = allPages.length * PER_PAGE;
      return nextStart < lastPage.total ? nextStart : undefined;
    },
  });
};
