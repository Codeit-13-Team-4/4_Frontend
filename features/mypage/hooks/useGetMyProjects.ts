"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import getMyProjects from "../api/getMyProjects";
import { MyProjectsParams, MyRoleType } from "../model/mypage.types";
import { mypageKeys } from "../model/mypage.queryKey";
import { MyApplicationStatusType } from "../model/mypage.types";

const PER_PAGE = 10;

export const useGetMyProjects = (role: MyRoleType, filterValue: string) => {
  const applicationStatus =
    role === "MEMBER" ? (filterValue as MyApplicationStatusType) : undefined;
  const status = role === "HOST" ? filterValue : undefined;

  const params: MyProjectsParams = {
    ...(role === "HOST" && { isHost: true }),
    ...(status && { status: status as MyProjectsParams["status"] }),
    ...(applicationStatus && { applicationStatus }),
  };

  return useInfiniteQuery({
    queryKey: [...mypageKeys.projectList(role, filterValue), params],
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
