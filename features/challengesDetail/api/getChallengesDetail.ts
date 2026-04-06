import { fetchClient } from "@/shared/lib/client/fetchClient";
import type { ChallengesDetail } from "@/features/challengesDetail/types/challengesDetail";

export async function getChallengesDetail(
  challengeId: number,
): Promise<ChallengesDetail> {
  const response = await fetchClient(`/api/challenges/${challengeId}`, {
    cache: "no-store",
  });
  const data = await response.json();
  return data.data;
}
