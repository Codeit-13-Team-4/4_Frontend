import { fetchClient } from "@/shared/lib/client/fetchClient";

export default async function approveChallengeApplication(
  applicationId: number,
) {
  const response = await fetchClient(
    `/api/challenges/applications/${applicationId}/approve`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    },
  );
  return response.json();
}
