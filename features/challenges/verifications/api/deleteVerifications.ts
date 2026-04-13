import { fetchClient } from "@/shared/lib/client/fetchClient";

export async function deleteVerifications({
  challengeId,
  verificationId,
}: {
  challengeId: number;
  verificationId: number;
}) {
  const response = await fetchClient(
    `/api/challenges/${challengeId}/verifications/${verificationId}`,
  );
  const data = await response.json();
  return data;
}
