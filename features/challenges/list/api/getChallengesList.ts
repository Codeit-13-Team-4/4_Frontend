import { fetchClient } from "@/shared/lib/client/fetchClient";
import { ChallengesFilter } from "@/features/challenges/model";

const createSearchParams = (filters: ChallengesFilter) => {
  const { keyword, status, participationType, sort, page, limit } = filters;

  const params = new URLSearchParams({
    page: String(page ?? 1),
    limit: String(limit ?? 10),
  });

  if (keyword) params.set("tag", keyword);
  if (status) params.set("status", status);
  if (participationType) params.set("participationType", participationType);
  if (sort && sort !== "latest") params.set("sort", sort);

  return params;
};

export async function getChallengesList(filters: ChallengesFilter) {
  const response = await fetchClient(
    `/api/challenges?${createSearchParams(filters)}`,
  );
  return response.json();
}
