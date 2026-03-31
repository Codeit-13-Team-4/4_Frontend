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

  const response = await fetch(
    `/api/projects/${projectId}/comments?${searchParams}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "댓글 조회에 실패했습니다.");
  }

  return data;
}
