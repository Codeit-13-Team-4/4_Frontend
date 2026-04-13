import { fetchClient } from "@/shared/lib/client/fetchClient";

export async function editVerification(
  challengeId: number,
  verificationId: number,
  payload: {
    content: string;
    imageUrls: string[];
  },
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
