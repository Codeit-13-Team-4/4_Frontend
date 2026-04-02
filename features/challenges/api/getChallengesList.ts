import { ChallengesFilter } from "../model";

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
  const response = await fetch(
    `/api/challenges?${createSearchParams(filters)}`,
  );

  if (!response.ok) {
    throw new Error(`챌린지 조회 실패 (${response.status})`);
  }

  const data = await response.json();

  return data;
}
