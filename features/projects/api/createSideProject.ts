import {
  ContactMethod,
  PositionType,
  ProjectType,
  TechStackType,
} from "../model";

interface CreateSideProjectBody {
  title: string;
  description: string;
  projectType: ProjectType;
  techStacks: TechStackType[];
  positions: PositionType[];
  maxMembers: number;
  recruitEndDate: string;
  projectStartDate: string;
  projectEndDate: string;
  contactMethod: ContactMethod;
  contactLink: string;
}

export async function createSideProject(body: CreateSideProjectBody) {
  const response = await fetch("/api/projects/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(
      `사이드 프로젝트 생성을 실패했습니다. (${response.status})`,
    );
  }

  const data = await response.json();

  return data;
}
