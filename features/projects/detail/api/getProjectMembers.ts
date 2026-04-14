import { fetchClient } from "@/shared/lib/client/fetchClient";
import type { ProjectMemberResponse } from "@/features/projects/model";

interface GetProjectMembersParams {
  projectId: number;
  start?: number;
  perPage?: number;
}

export async function getProjectMembers({
  projectId,
  start = 0,
  perPage = 50,
}: GetProjectMembersParams): Promise<ProjectMemberResponse> {
  const searchParams = new URLSearchParams({
    start: String(start),
    perPage: String(perPage),
  });

  const response = await fetchClient(
    `/api/projects/${projectId}/members?${searchParams}`,
    { cache: "no-store" },
  );
  return response.json();
}
