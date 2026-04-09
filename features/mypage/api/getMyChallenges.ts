import { fetchClient } from "@/shared/lib/client/fetchClient";
import {
  MyChallengesParams,
  MyChallengesResponse,
} from "../model/mypage.types";

const createSearchParams = (params: MyChallengesParams) => {
  const { isMember, isHost, hasPendingApplication, status, page, limit } =
    params;

  const searchParams = new URLSearchParams({
    page: String(page ?? 1),
    limit: String(limit ?? 10),
  });

  if (isMember) searchParams.set("isMember", "true");
  if (isHost) searchParams.set("isHost", "true");
  if (hasPendingApplication) searchParams.set("hasPendingApplication", "true");
  if (status) searchParams.set("status", status);

  return searchParams;
};

export default async function getMyChallenges(
  params: MyChallengesParams,
): Promise<MyChallengesResponse> {
  const response = await fetchClient(
    `/api/challenges?${createSearchParams(params)}`,
  );

  return response.json();
}
