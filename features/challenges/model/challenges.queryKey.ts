import type { ChallengesFilter } from "./challenges.types";

export const challengeKeys = {
  all: ["challenges"] as const,

  lists: () => [...challengeKeys.all, "list"] as const,
  list: (filters: ChallengesFilter = {}) =>
    [...challengeKeys.lists(), filters] as const,

  details: () => [...challengeKeys.all, "detail"] as const,
  detail: (id: number) => [...challengeKeys.details(), id] as const,

  comments: (id: number) => [...challengeKeys.detail(id), "comments"] as const,
  members: (id: number) => [...challengeKeys.detail(id), "members"] as const,
};
