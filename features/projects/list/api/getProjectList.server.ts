import { cookies } from "next/headers";
import { ProjectFilter } from "@/features/projects/model";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

export async function getProjectListServer(filters: ProjectFilter) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const response = await fetch(
    `${BASE_URL}/projects?${createSearchParams(filters)}`,
    {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      cache: "no-store",
    },
  );

  if (!response.ok) throw new Error("프로젝트 목록 조회 실패");

  return response.json();
}
