import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { readAllNotifications } from "@/features/notification/api/readAllNotifications";
import { NotificationResponse } from "@/shared/types/notification";
import { notificationKeys } from "@/features/notification/model/notification.queryKey";

export function useReadAllNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: readAllNotifications,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: notificationKeys.all });

      const previous = queryClient.getQueriesData<
        InfiniteData<NotificationResponse>
      >({ queryKey: notificationKeys.all });

      queryClient.setQueriesData<InfiniteData<NotificationResponse>>(
        { queryKey: notificationKeys.all },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.map((n) => ({ ...n, isRead: true })),
            })),
          };
        },
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      context?.previous.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}
