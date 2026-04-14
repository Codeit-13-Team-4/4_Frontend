import { fetchClient } from "@/shared/lib/client/fetchClient";
import { VerificationsIdProps } from "@/features/challenges/verifications/model";

export async function getVerificationsDetail({
  challengeId,
  verificationId,
}: VerificationsIdProps) {
  const response = await fetchClient(
    `/api/challenges/${challengeId}/verifications/${verificationId}`,
  );
  const data = await response.json();

  return data;
}
