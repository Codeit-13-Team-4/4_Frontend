import type { ProjectFilter } from "./project.types";

export const projectKeys = {
  all: ["projects"] as const,

  lists: () => [...projectKeys.all, "list"] as const,
  list: (filters: ProjectFilter = {}) =>
    [...projectKeys.lists(), filters] as const,

  details: () => [...projectKeys.all, "detail"] as const,
  detail: (id: number) => [...projectKeys.details(), id] as const,

  comments: (id: number) => [...projectKeys.detail(id), "comments"] as const,
};
