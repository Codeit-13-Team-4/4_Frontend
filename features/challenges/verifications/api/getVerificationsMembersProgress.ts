import { fetchClient } from "@/shared/lib/client/fetchClient";

export async function getVerificationsMembersProgress(challengeId: number) {
  const response = await fetchClient(
    `/api/challenges/${challengeId}/verifications/members/progress`,
  );
  return response.json();
}
