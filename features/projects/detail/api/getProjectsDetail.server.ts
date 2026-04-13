import { cookies } from "next/headers";
import type { ProjectDetail } from "@/features/projects/model";
import { ApiError } from "@/shared/lib/errors/ApiError";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getProjectsDetailServer(
  projectId: number,
): Promise<ProjectDetail> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(`${BASE_URL}/projects/${projectId}`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    cache: "no-store",
  });

  if (!response.ok) {
    throw new ApiError(
      response.status,
      `프로젝트 조회 실패 (${response.status})`,
    );
  }

  return response.json();
}
