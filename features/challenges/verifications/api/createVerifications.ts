import { fetchClient } from "@/shared/lib/client/fetchClient";

export async function createVerifications(
  challengeId: number,
  payload: {
    content: string;
    imageUrls: string[];
  },
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
