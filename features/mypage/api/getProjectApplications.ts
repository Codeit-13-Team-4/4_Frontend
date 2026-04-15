import { fetchClient } from "@/shared/lib/client/fetchClient";
import { ProjectApplicationProps } from "../model/mypage.types";

type GetProjectApplicationsParams = {
  projectId: number;
  start?: number;
  perPage?: number;
};

export default async function getProjectApplications({
  projectId,
  start = 0,
  perPage = 50,
}: GetProjectApplicationsParams): Promise<ProjectApplicationProps> {
  const searchParams = new URLSearchParams({
    start: String(start),
    perPage: String(perPage),
  });

  const response = await fetchClient(
    `/api/projects/${projectId}/applications?${searchParams}`,
  );
  return response.json();
}
