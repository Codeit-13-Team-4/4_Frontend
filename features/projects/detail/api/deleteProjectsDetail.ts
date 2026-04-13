import { fetchClient } from "@/shared/lib/client/fetchClient";

export async function deleteProjectsDetail(projectId: number): Promise<void> {
  await fetchClient(`/api/projects/${projectId}`, { method: "DELETE" });
}
