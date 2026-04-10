import type { LikedChallengeFilter } from "./liked.types";
import type { LikedProjectFilter } from "./liked.types";

export const likedChallengeKeys = {
  all: ["likedChallenges"] as const,

  lists: () => [...likedChallengeKeys.all, "list"] as const,
  list: (filters: LikedChallengeFilter = {}) =>
    [...likedChallengeKeys.lists(), filters] as const,
};

export const likedProjectKeys = {
  all: ["likedProjects"] as const,

  lists: () => [...likedProjectKeys.all, "list"] as const,
  list: (filters: LikedProjectFilter = {}) =>
    [...likedProjectKeys.lists(), filters] as const,
};
