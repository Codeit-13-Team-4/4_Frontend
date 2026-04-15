import { fetchClient } from "@/shared/lib/client/fetchClient";
import {
  UpdateVerificationStatusRequest,
  VerificationsIdProps,
} from "@/features/challenges/verifications/model";

export async function updateVerificationStatus(
  { challengeId, verificationId }: VerificationsIdProps,
  payload: UpdateVerificationStatusRequest,
) {
  await fetchClient(
    `/api/challenges/${challengeId}/verifications/${verificationId}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );
}
