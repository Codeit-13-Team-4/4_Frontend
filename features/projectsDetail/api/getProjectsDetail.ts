import { fetchClient } from "@/shared/lib/client/fetchClient";
import type { ProjectDetail } from "@/features/projectsDetail/types/projectsDetail";

export async function getProjectDetail(
  projectId: number,
): Promise<ProjectDetail> {
  const response = await fetchClient(`/api/projects/${projectId}`, {
    cache: "no-store",
  });
  return response.json();
}
