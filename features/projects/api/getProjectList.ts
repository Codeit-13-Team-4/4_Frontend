import { ProjectFilter } from "../model";

export async function getProjectList(filters: ProjectFilter) {
  const { keyword, status, projectType, positions } = filters;
  console.log("🚀 ~ getProjectList ~ keyword:", keyword);
  const params = new URLSearchParams({
    start: "0",
    perPage: "10",
  });

  if (keyword) {
    params.set("search", keyword);
  } else {
    if (status) {
      params.set("status", status);
    }

    if (projectType && projectType.length > 0) {
      projectType.forEach((type) => {
        params.append("projectType", type);
      });
    }

    if (positions && positions.length > 0) {
      positions.forEach((position) => {
        params.append("positions", position);
      });
    }
  }

  const response = await fetch(`/api/projects?${params.toString()}`);

  if (!response.ok) {
    throw new Error("프로젝트 조회 실패");
  }

  const data = await response.json();
  // console.log("🚀 ~ getProjectList ~ data:", data);

  return data;
}
