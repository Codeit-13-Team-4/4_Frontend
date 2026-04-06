import { cookies } from "next/headers";
import { ChallengesFilter } from "../model";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

export async function getChallengesListServer(filters: ChallengesFilter) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  console.log("dd", `${BASE_URL}/challenges?${createSearchParams(filters)}`);

  const response = await fetch(
    `${BASE_URL}/challenges?${createSearchParams(filters)}`,
    {
      headers: accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {},
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error(`챌린지 조회 실패 (${response.status})`);
  }

  const data = await response.json();

  return data;
}
