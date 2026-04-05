import { fetchClient } from "@/shared/lib/client/fetchClient";

export async function readNotification(id: number): Promise<void> {
  await fetchClient(`/api/notifications/${id}`, { method: "PATCH" });
}
