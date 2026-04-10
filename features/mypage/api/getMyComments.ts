import { fetchClient } from "@/shared/lib/client/fetchClient";
import { MyCommentsParams, MyCommentResponse } from "../model/mypage.types";

const createSearchParams = (params: MyCommentsParams) => {
  const { start, perPage, type } = params;

  const searchParams = new URLSearchParams({
    start: String(start ?? 0),
    perPage: String(perPage ?? 10),
  });

  if (type) searchParams.set("type", type);

  return searchParams;
};

export default async function getMyComments(
  params: MyCommentsParams,
): Promise<MyCommentResponse> {
  const response = await fetchClient(
    `/api/mypage/comments?${createSearchParams(params)}`,
  );

  return response.json();
}
