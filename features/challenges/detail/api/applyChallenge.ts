import { fetchClient } from "@/shared/lib/client/fetchClient";

export async function applyChallenge({
  challengeId,
  name,
  motivation,
}: {
  challengeId: number;
  name: string;
  motivation: string;
}): Promise<void> {
  await fetchClient(`/api/challenges/${challengeId}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, motivation }),
  });
}
