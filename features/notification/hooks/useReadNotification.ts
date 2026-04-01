import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readNotification } from "@/features/notification/api/readNotification";

export function useReadNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => readNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
