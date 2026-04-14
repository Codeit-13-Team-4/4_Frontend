import { fetchClient } from "@/shared/lib/client/fetchClient";
import type { ChallengeMemberResponse } from "@/features/challenges/model";

interface GetChallengeMembersParams {
  challengeId: number;
  start?: number;
  perPage?: number;
}

export async function getChallengeMembers({
  challengeId,
  start = 0,
  perPage = 50,
}: GetChallengeMembersParams): Promise<ChallengeMemberResponse> {
  const searchParams = new URLSearchParams({
    start: String(start),
    perPage: String(perPage),
  });

  const response = await fetchClient(
    `/api/challenges/${challengeId}/members?${searchParams}`,
    { cache: "no-store" },
  );
  return response.json();
}
