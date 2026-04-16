import { fetchClient } from "@/shared/lib/client/fetchClient";

export async function getVerificationsMemberPermissions(challengeId: number) {
  const response = await fetchClient(
    `/api/challenges/${challengeId}/verifications/me`,
  );

  return response.json();
}
