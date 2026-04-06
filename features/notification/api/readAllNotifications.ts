import { fetchClient } from "@/shared/lib/client/fetchClient";

export async function readAllNotifications(): Promise<void> {
  await fetchClient("/api/notifications/read-all", { method: "PATCH" });
}
