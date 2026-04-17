import { fetchClient } from "@/shared/lib/client/fetchClient";
import { ProjectFilter } from "@/features/projects/model";

const createSearchParams = (filters: ProjectFilter) => {
  const {
    keyword,
    status,
    projectType,
    positions,
    sort,
    start,
    perPage,
    order,
  } = filters;
  const params = new URLSearchParams({
    start: String(start ?? 0),
    perPage: String(perPage ?? 10),
  });

  if (keyword) {
    params.set("search", keyword);
    return params;
  }

  if (status) params.set("status", status);

  if (sort) {
    if (sort === "recruitEndDate") {
      params.set("status", "recruiting");
    }
    params.set("sort", sort);
  }

  if (order) {
    params.set("order", order);
  }

  projectType?.forEach((type) => params.append("projectType", type));
  positions?.forEach((position) => params.append("positions", position));

  return params;
};

export async function getProjectList(filters: ProjectFilter) {
  const response = await fetchClient(
    `/api/projects?${createSearchParams(filters)}`,
  );
  return response.json();
}
