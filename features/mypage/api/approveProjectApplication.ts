import { fetchClient } from "@/shared/lib/client/fetchClient";

export default async function approveProjectApplication(applicationId: number) {
  const response = await fetchClient(
    `/api/projects/applications/${applicationId}/approve`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    },
  );
  return response.json();
}
