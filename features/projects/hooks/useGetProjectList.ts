"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getProjectList } from "../api/getProjectList";
import { ProjectFilter } from "@/features/projects/model";

const PER_PAGE = 10;

export const useGetProjectList = (filters: ProjectFilter = {}) => {
  return useInfiniteQuery({
    queryKey: ["projectList", filters],
    queryFn: ({ pageParam }) => {
      return getProjectList({
        ...filters,
        start: pageParam,
        perPage: PER_PAGE,
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextStart = allPages.length * PER_PAGE;
      return nextStart < lastPage.total ? nextStart : undefined;
    },
    throwOnError: true,
  });
};
