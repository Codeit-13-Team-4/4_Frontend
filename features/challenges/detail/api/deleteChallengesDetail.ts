import { fetchClient } from "@/shared/lib/client/fetchClient";

export async function deleteChallengesDetail(
  challengeId: number,
): Promise<void> {
  await fetchClient(`/api/challenges/${challengeId}`, { method: "DELETE" });
}
