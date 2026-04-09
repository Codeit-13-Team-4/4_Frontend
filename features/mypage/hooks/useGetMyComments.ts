"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import getMyComments from "../api/getMyComments";
import { MyCommentsParams } from "../model/mypage.types";
import { mypageKeys } from "../model/mypage.queryKey";

const PER_PAGE = 10;

export const useGetMyComments = (params: MyCommentsParams = {}) => {
  return useInfiniteQuery({
    queryKey: mypageKeys.commentList(params),
    queryFn: ({ pageParam }) => {
      return getMyComments({
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
