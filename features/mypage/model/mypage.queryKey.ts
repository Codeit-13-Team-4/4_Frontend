import type {
  MyChallengesParams,
  MyProjectsParams,
  MyCommentsParams,
} from "./mypage.types";

export const mypageKeys = {
  all: ["mypage"] as const,

  challenges: () => [...mypageKeys.all, "challenges"] as const,
  challengeList: (params: MyChallengesParams = {}) =>
    [...mypageKeys.challenges(), params] as const,

  projects: () => [...mypageKeys.all, "projects"] as const,
  projectList: (params: MyProjectsParams = {}) =>
    [...mypageKeys.projects(), params] as const,

  comments: () => [...mypageKeys.all, "comments"] as const,
  commentList: (params: MyCommentsParams = {}) =>
    [...mypageKeys.comments(), params] as const,
};
