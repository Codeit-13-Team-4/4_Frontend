import { fetchClient } from "@/shared/lib/client/fetchClient";

export async function toggleChallengeLike(
  challengeId: number,
  liked: boolean,
): Promise<void> {
  await fetchClient(`/api/challenges/${challengeId}/liked`, {
    method: liked ? "DELETE" : "POST",
  });
}
