import { notFound } from "next/navigation";
import { getQueryClient } from "@/app/providers/getQueryClient";
import { projectKeys } from "@/features/projects/model";
import { getProjectsDetailServer } from "@/features/projects/detail/api/getProjectsDetail.server";
import { ApiError } from "@/shared/lib/errors/ApiError";

export async function prefetchProjectsDetail(projectId: number) {
  const queryClient = getQueryClient();

  try {
    await queryClient.fetchQuery({
      queryKey: projectKeys.detail(projectId),
      queryFn: () => getProjectsDetailServer(projectId),
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  return queryClient;
}
