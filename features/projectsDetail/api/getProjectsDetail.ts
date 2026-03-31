import type { ProjectDetail } from "@/features/projectsDetail/types/projectsDetail";

export async function getProjectDetail(
  projectId: number,
): Promise<ProjectDetail> {
  const response = await fetch(`/api/projects/${projectId}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "프로젝트 조회에 실패했습니다.");
  }

  return data;
}
