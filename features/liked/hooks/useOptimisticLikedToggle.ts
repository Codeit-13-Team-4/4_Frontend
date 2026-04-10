"use client";

import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import { toast } from "sonner";

interface InfiniteListPage<TItem> {
  data: TItem[];
  total: number;
}

interface InfiniteListData<TItem> {
  pages: InfiniteListPage<TItem>[];
  pageParams: unknown[];
}

interface UseOptimisticLikedToggleOptions<TDetail> {
  itemId: number;
  detailQueryKey: QueryKey;
  likedListsQueryKey: QueryKey;
  additionalInvalidateQueryKeys?: QueryKey[];
  mutationFn: (currentLiked: boolean) => Promise<void>;
  updateDetail: (detail: TDetail, nextLiked: boolean) => TDetail;
  errorMessage?: string;
}

export function useOptimisticLikedToggle<
  TItem extends { id: number },
  TDetail,
>({
  itemId,
  detailQueryKey,
  likedListsQueryKey,
  additionalInvalidateQueryKeys = [],
  mutationFn,
  updateDetail,
  errorMessage = "좋아요 처리에 실패했습니다.",
}: UseOptimisticLikedToggleOptions<TDetail>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onMutate: async (currentLiked) => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: likedListsQueryKey }),
        queryClient.cancelQueries({ queryKey: detailQueryKey }),
      ]);

      const previousLikedQueries = queryClient.getQueriesData<
        InfiniteListData<TItem>
      >({
        queryKey: likedListsQueryKey,
      });
      const previousDetail = queryClient.getQueryData<TDetail>(detailQueryKey);

      if (currentLiked) {
        previousLikedQueries.forEach(([queryKey, data]) => {
          if (!data) return;

          queryClient.setQueryData<InfiniteListData<TItem>>(queryKey, {
            ...data,
            pages: data.pages.map((page) => ({
              ...page,
              data: page.data.filter((item) => item.id !== itemId),
              total: Math.max(page.total - 1, 0),
            })),
          });
        });
      }

      queryClient.setQueryData<TDetail>(detailQueryKey, (old) =>
        old ? updateDetail(old, !currentLiked) : old,
      );

      return { previousLikedQueries, previousDetail };
    },
    onError: (error, _currentLiked, context) => {
      context?.previousLikedQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });

      if (context?.previousDetail) {
        queryClient.setQueryData(detailQueryKey, context.previousDetail);
      }

      toast.error(error instanceof Error ? error.message : errorMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: likedListsQueryKey });
      queryClient.invalidateQueries({ queryKey: detailQueryKey });
      additionalInvalidateQueryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
  });
}
