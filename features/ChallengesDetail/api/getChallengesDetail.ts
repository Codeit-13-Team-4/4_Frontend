import type { ChallengesDetail } from "@/features/challengesDetail/types/challengesDetail";

export async function getChallengesDetail(
  challengeId: number,
): Promise<ChallengesDetail> {
  const response = await fetch(`/api/challenges/${challengeId}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "챌린지 조회에 실패했습니다.");
  }

  return data;
}
