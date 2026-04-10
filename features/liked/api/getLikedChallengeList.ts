import { fetchClient } from "@/shared/lib/client/fetchClient";
import type {
  LikedChallengeFilter,
  LikedChallengeListResponse,
} from "../model";

function createSearchParams(filters: LikedChallengeFilter) {
  const params = new URLSearchParams({
    start: String(filters.start ?? 0),
    perPage: String(filters.perPage ?? 10),
    sort: filters.sort ?? "latest",
  });

  if (filters.status) {
    params.set("status", filters.status);
  }

  if (filters.participationType) {
    params.set("participationType", filters.participationType);
  }

  return params;
}

export async function getLikedChallengeList(
  filters: LikedChallengeFilter,
): Promise<LikedChallengeListResponse> {
  const response = await fetchClient(
    `/api/challenges/me/liked?${createSearchParams(filters)}`,
  );

  return response.json();
}
