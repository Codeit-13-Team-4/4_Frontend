"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import getMyProjects from "../api/getMyProjects";
import { MyProjectsParams } from "../model/mypage.types";
import { mypageKeys } from "../model/mypage.queryKey";

const PER_PAGE = 10;

export const useGetMyProjects = (params: MyProjectsParams) => {
  return useInfiniteQuery({
    queryKey: mypageKeys.projectList(params),
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
