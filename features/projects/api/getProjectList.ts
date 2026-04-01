import { ProjectFilter } from "../model";

const createSearchParams = (filters: ProjectFilter) => {
  const { keyword, status, projectType, positions, sort, start, perPage } =
    filters;
  const params = new URLSearchParams({
    start: String(start ?? 0),
    perPage: String(perPage ?? 10),
  });

  if (keyword) {
    params.set("search", keyword);
    return params;
  }

  if (status) {
    params.set("status", status);
  }
  if (sort && sort !== "createdAt") {
    if (sort === "recruitEndDate") {
      params.set("order", "ASC");
    }
    params.set("sort", sort);
  }

  projectType?.forEach((type) => params.append("projectType", type));
  positions?.forEach((position) => params.append("positions", position));

  return params;
};

export async function getProjectList(filters: ProjectFilter) {
  const response = await fetch(`/api/projects?${createSearchParams(filters)}`);

  if (!response.ok) {
    throw new Error(`프로젝트 조회 실패 (${response.status})`);
  }

  const data = await response.json();

  return data;
}
