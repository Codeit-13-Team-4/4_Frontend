import { fetchClient } from "@/shared/lib/client/fetchClient";
import type { LikedProjectFilter, LikedProjectListResponse } from "../model";

function createSearchParams(filters: LikedProjectFilter) {
  const params = new URLSearchParams({
    start: String(filters.start ?? 0),
    perPage: String(filters.perPage ?? 10),
    sort: filters.sort ?? "latest",
  });

  if (filters.status) {
    params.set("status", filters.status);
  }

  filters.projectType?.forEach((type) => {
    params.append("projectType", type);
  });

  filters.positions?.forEach((position) => {
    params.append("positions", position);
  });

  return params;
}

export async function getLikedProjectList(
  filters: LikedProjectFilter,
): Promise<LikedProjectListResponse> {
  const response = await fetchClient(
    `/api/projects/me/liked?${createSearchParams(filters)}`,
  );

  return response.json();
}
