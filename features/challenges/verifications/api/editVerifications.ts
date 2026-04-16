import { fetchClient } from "@/shared/lib/client/fetchClient";
import {
  VerificationsIdProps,
  VerificationsPayload,
} from "@/features/challenges/verifications/model";
export async function editVerification(
  { challengeId, verificationId }: VerificationsIdProps,
  payload: VerificationsPayload,
) {
  const response = await fetchClient(
    `/api/challenges/${challengeId}/verifications/${verificationId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  return response;
}
