import type {
  ProjectType,
  TechStackType,
  PositionType,
  ContactMethodType,
} from "@/features/projectsDetail/types/projectsDetail";

export interface UpdateProjectDetailParams {
  projectId: number;
  title?: string;
  description?: string;
  projectType?: ProjectType;
  techStacks?: TechStackType[];
  positions?: PositionType[];
  maxMembers?: number;
  recruitEndDate?: string;
  projectStartDate?: string;
  projectEndDate?: string;
  contactMethod?: ContactMethodType;
  contactLink?: string;
}

export async function updateProjectsDetail({
  projectId,
  ...body
}: UpdateProjectDetailParams): Promise<void> {
  const response = await fetch(`/api/projects/${projectId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "프로젝트 수정에 실패했습니다.");
  }
}
