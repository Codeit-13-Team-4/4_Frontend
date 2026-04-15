import { useInfiniteQuery } from "@tanstack/react-query";
import { getNotifications } from "@/features/notification/api/getNotifications";
import { NotificationsParamsType } from "@/features/notification/types/notifications";
import { notificationKeys } from "@/features/notification/model/notification.queryKey";

const PER_PAGE = 10;

export function useNotifications(
  params?: Omit<NotificationsParamsType, "start" | "perPage">,
  enabled = true,
) {
  return useInfiniteQuery({
    queryKey: notificationKeys.list(params),
    queryFn: ({ pageParam }) =>
      getNotifications({ ...params, start: pageParam, perPage: PER_PAGE }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      const nextStart = lastPageParam + PER_PAGE;
      return nextStart < lastPage.total ? nextStart : undefined;
    },
    enabled,
  });
}
