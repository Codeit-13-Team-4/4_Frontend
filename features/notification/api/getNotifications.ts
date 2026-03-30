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

  const response = await fetch(`/api/notifications?${searchParams}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "알림 조회에 실패했습니다.");
  }

  return data;
}
