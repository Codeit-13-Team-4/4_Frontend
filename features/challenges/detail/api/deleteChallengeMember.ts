import { fetchClient } from "@/shared/lib/client/fetchClient";

export async function deleteChallengeMember({
  challengeId,
  targetUserId,
}: {
  challengeId: number;
  targetUserId: number;
}) {
  await fetchClient(`/api/challenges/${challengeId}/members/${targetUserId}`, {
    method: "DELETE",
  });
}
