import { ApiError } from "@/shared/lib/errors/ApiError";
import { fetchWithAuthRetry } from "@/shared/lib/server/auth";
import type {
  BackendLikedProjectListResponse,
  LikedProjectCardData,
  LikedProjectFilter,
  LikedProjectListItem,
  LikedProjectListResponse,
  LikedSortType,
} from "@/features/liked/model";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BACKEND_PER_PAGE = 50;

function createSearchParams(filters: LikedProjectFilter) {
  const params = new URLSearchParams({
    start: String(filters.start ?? 0),
    perPage: String(filters.perPage ?? 10),
    sort: "createdAt",
    order: filters.sort === "oldest" ? "ASC" : "DESC",
  });

  return params;
}

function mapLikedProjectToCard(
  entry: LikedProjectListItem,
): LikedProjectCardData {
  const { project } = entry;

  return {
    id: project.id,
    title: project.title,
    projectType: project.projectType,
    techStacks: project.techStacks,
    positions: project.positions,
    maxMembers: project.maxMembers,
    recruitEndDate: project.recruitEndDate,
    status: project.status,
    liked: true,
  };
}

function matchesFilter(
  project: LikedProjectCardData,
  filters: LikedProjectFilter,
) {
  if (filters.status && project.status !== filters.status) {
    return false;
  }

  if (
    filters.projectType?.length &&
    !filters.projectType.includes(project.projectType)
  ) {
    return false;
  }

  if (
    filters.positions?.length &&
    !project.positions.some((position) => filters.positions?.includes(position))
  ) {
    return false;
  }

  return true;
}

async function fetchLikedProjectPage(filters: LikedProjectFilter) {
  return fetchWithAuthRetry<BackendLikedProjectListResponse>(
    `${BASE_URL}/projects/me/liked?${createSearchParams(filters)}`,
  );
}

async function mapEntriesToCards(
  entries: LikedProjectListItem[],
  filters?: LikedProjectFilter,
) {
  const projectCards = entries.map(mapLikedProjectToCard);

  if (!filters) {
    return projectCards;
  }

  return projectCards.filter((project) => matchesFilter(project, filters));
}

async function fetchProjectViewCount(projectId: number) {
  try {
    const response = await fetchWithAuthRetry<{ viewCount: number }>(
      `${BASE_URL}/projects/${projectId}`,
    );

    return response.viewCount;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return 0;
    }

    throw error;
  }
}

async function sortProjectCards(
  projectCards: LikedProjectCardData[],
  sort: LikedSortType | undefined,
) {
  if (sort === "popular") {
    const cardsWithViewCount = await Promise.all(
      projectCards.map(async (project) => ({
        project,
        viewCount: await fetchProjectViewCount(project.id),
      })),
    );

    return cardsWithViewCount
      .sort((a, b) => b.viewCount - a.viewCount)
      .map(({ project }) => project);
  }

  if (sort === "deadline") {
    return [...projectCards].sort(
      (a, b) =>
        new Date(a.recruitEndDate).getTime() -
        new Date(b.recruitEndDate).getTime(),
    );
  }

  return projectCards;
}

async function fetchAllLikedProjectEntries(filters: LikedProjectFilter) {
  const entries: LikedProjectListItem[] = [];
  let start = 0;
  let total = 0;

  do {
    const page = await fetchLikedProjectPage({
      ...filters,
      start,
      perPage: BACKEND_PER_PAGE,
    });

    total = page.total;
    entries.push(...page.data);

    if (page.data.length < BACKEND_PER_PAGE) {
      break;
    }

    start += BACKEND_PER_PAGE;
  } while (start < total);

  return entries;
}

export async function getLikedProjectListServer(
  filters: LikedProjectFilter = {},
): Promise<LikedProjectListResponse> {
  const {
    start = 0,
    perPage = 10,
    status,
    projectType,
    positions,
    sort = "latest",
  } = filters;
  const hasLocalFilters = Boolean(
    status || projectType?.length || positions?.length,
  );
  const hasLocalSorting = sort === "popular" || sort === "deadline";

  if (!hasLocalFilters && !hasLocalSorting) {
    const likedPage = await fetchLikedProjectPage(filters);
    const data = await mapEntriesToCards(likedPage.data);

    return {
      data,
      total: likedPage.total,
    };
  }

  const entries = await fetchAllLikedProjectEntries(filters);
  const filteredData = await mapEntriesToCards(entries, {
    status,
    projectType,
    positions,
  });
  const sortedData = await sortProjectCards(filteredData, sort);

  return {
    data: sortedData.slice(start, start + perPage),
    total: sortedData.length,
  };
}
