import { fetchClient } from "@/shared/lib/client/fetchClient";
import type { CommentsResponse } from "@/features/challenges/detail/model/comment";

interface GetCommentsParams {
  challengeId: number;
  start?: number;
  perPage?: number;
  sort?: "createdAt";
  order?: "ASC" | "DESC";
}

export async function getChallengesDetailComments({
  challengeId,
  start = 0,
  perPage = 10,
  sort,
  order,
}: GetCommentsParams): Promise<CommentsResponse> {
  const searchParams = new URLSearchParams({
    start: String(start),
    perPage: String(perPage),
  });

  if (sort) searchParams.set("sort", sort);
  if (order) searchParams.set("order", order);

  const response = await fetchClient(
    `/api/challenges/${challengeId}/comments?${searchParams}`,
    { cache: "no-store" },
  );
  const data = await response.json();
  return data;
}
