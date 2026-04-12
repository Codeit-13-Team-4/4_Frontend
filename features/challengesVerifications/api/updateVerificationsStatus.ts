import { fetchClient } from "@/shared/lib/client/fetchClient";
import { UpdateVerificationStatusRequest } from "@/features/challengesVerifications/model";

export async function updateVerificationStatus(
  challengeId: number,
  verificationId: number,
  payload: UpdateVerificationStatusRequest,
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

  if (!response.ok) {
    throw new Error("인증 상태 변경에 실패했습니다.");
  }

  return response.json();
}
