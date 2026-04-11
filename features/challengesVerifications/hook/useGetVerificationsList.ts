"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { verificationsKeys } from "../model/verifications.queryKey";
import { VerificationsFilter } from "../model/verifications.type";
import { getVerificationsList } from "../api/getVerificationsList";

const LIMIT = 10;

export const useGetVerificationsList = (
  challengeId: number,
  filters: VerificationsFilter = {},
) => {
  return useInfiniteQuery({
    queryKey: verificationsKeys.list({ challengeId, filters }),
    queryFn: ({ pageParam }) => {
      return getVerificationsList({
        challengeId,
        filters: {
          ...filters,
          page: pageParam,
          limit: LIMIT,
        },
      });
    },
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const page = lastPage?.pagination?.page;
      const hasNext = lastPage?.pagination?.hasNext;

      if (hasNext && page !== undefined) {
        return page + 1;
      }
      return undefined;
    },
    throwOnError: true,
  });
};
