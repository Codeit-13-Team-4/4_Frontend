import { fetchClient } from "@/shared/lib/client/fetchClient";
import { VerificationsPayload } from "@/features/challenges/verifications/model";

export async function createVerifications(
  challengeId: number,
  payload: VerificationsPayload,
) {
  const response = await fetchClient(
    `/api/challenges/${challengeId}/verifications`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );
  const data = response.json();

  return data;
}
