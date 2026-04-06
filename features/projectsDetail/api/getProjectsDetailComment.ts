import { fetchClient } from "@/shared/lib/client/fetchClient";
import type { CommentsResponse } from "@/features/projectsDetail/types/comment";

interface GetCommentsParams {
  projectId: number;
  start?: number;
  perPage?: number;
  sort?: "createdAt";
  order?: "ASC" | "DESC";
}

export async function getProjectsDetailComments({
  projectId,
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
    `/api/projects/${projectId}/comments?${searchParams}`,
    { cache: "no-store" },
  );
  return response.json();
}
