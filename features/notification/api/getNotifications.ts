import { fetchClient } from "@/shared/lib/client/fetchClient";
import { NotificationResponse } from "@/shared/types/notification";
import { NotificationsParamsType } from "@/features/notification/types/notifications";

export async function getNotifications(
  params?: NotificationsParamsType,
): Promise<NotificationResponse> {
  const searchParams = new URLSearchParams({
    start: String(params?.start ?? 0),
    perPage: String(params?.perPage ?? 10),
  });

  if (params?.type) searchParams.set("type", params.type);
  if (params?.isRead !== undefined)
    searchParams.set("isRead", String(params.isRead));

  const response = await fetchClient(`/api/notifications?${searchParams}`, {
    cache: "no-store",
  });
  return response.json();
}
