import { fetchClient } from "@/shared/lib/client/fetchClient";
import { MyProjectsParams, MyProjectsResponse } from "../model/mypage.types";

const createSearchParams = (params: MyProjectsParams) => {
  const { isMember, isHost, hasPendingApplication, status, start, perPage } =
    params;

  const searchParams = new URLSearchParams({
    start: String(start ?? 0),
    perPage: String(perPage ?? 10),
  });

  if (isMember) searchParams.set("isMember", "true");
  if (isHost) searchParams.set("isHost", "true");
  if (hasPendingApplication) searchParams.set("hasPendingApplication", "true");
  if (status) searchParams.set("status", status);

  return searchParams;
};

export default async function getMyProjects(
  params: MyProjectsParams,
): Promise<MyProjectsResponse> {
  const response = await fetchClient(
    `/api/projects?${createSearchParams(params)}`,
  );

  return response.json();
}
