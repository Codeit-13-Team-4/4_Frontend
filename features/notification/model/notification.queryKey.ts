import type { NotificationsParamsType } from "../types/notifications";

type NotificationParams = Omit<NotificationsParamsType, "start" | "perPage">;

export const notificationKeys = {
  all: ["notifications"] as const,

  lists: () => [...notificationKeys.all, "list"] as const,
  list: (params?: NotificationParams) =>
    [...notificationKeys.lists(), params] as const,
};
