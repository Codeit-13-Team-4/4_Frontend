import { useInfiniteQuery } from "@tanstack/react-query";
import { getNotifications } from "@/features/notification/api/getNotifications";
import { NotificationsParamsType } from "@/features/notification/types/notifications";

const PER_PAGE = 10;

export function useNotifications(
  params?: Omit<NotificationsParamsType, "start" | "perPage">,
) {
  return useInfiniteQuery({
    queryKey: ["notifications", params],
    queryFn: ({ pageParam }) =>
      getNotifications({ ...params, start: pageParam, perPage: PER_PAGE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const nextStart = lastPageParam + PER_PAGE;
      return nextStart < lastPage.total ? nextStart : undefined;
    },
  });
}
