import type { MyCommentsParams, MyRoleType } from "./mypage.types";

export const mypageKeys = {
  all: ["mypage"] as const,

  challenges: () => [...mypageKeys.all, "challenges"] as const,
  challengeList: (role: MyRoleType, status: string) =>
    [...mypageKeys.challenges(), role, status] as const,

  projects: () => [...mypageKeys.all, "projects"] as const,
  projectList: (role: MyRoleType, status: string) =>
    [...mypageKeys.projects(), role, status] as const,

  comments: () => [...mypageKeys.all, "comments"] as const,
  commentList: (params: MyCommentsParams = {}) =>
    [...mypageKeys.comments(), params] as const,
};
