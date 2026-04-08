import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readNotification } from "@/features/notification/api/readNotification";
import { notificationKeys } from "@/features/notification/model/notification.queryKey";

export function useReadNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => readNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
  });
}
