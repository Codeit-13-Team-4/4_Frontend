import { fetchClient } from "@/shared/lib/client/fetchClient";

type applyChallengesProps = {
  name: string;
  motivation: string;
  challengeId: number;
};

export async function applicationsChallenges({
  challengeId,
  name,
  motivation,
}: applyChallengesProps) {
  const response = await fetchClient(`/api/challenges/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ challengeId, name, motivation }),
  });
  return response.json();
}
