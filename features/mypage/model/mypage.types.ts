import { User } from "@/shared/types/user";
import { ChallengesResponse } from "@/features/challenges/model/challenges.types";
import {
  MY_CHALLENGE_STATUS_FILTERS,
  MY_PROJECT_STATUS_FILTERS,
  MY_ROLE_TABS,
} from "./mypage.constants";
import { ProjectsResponse } from "@/features/projects/model";

export type MyTab = "challenges" | "projects" | "comments";

export type MyRoleType = (typeof MY_ROLE_TABS)[number]["value"];

export type MyChallengeStatusType =
  (typeof MY_CHALLENGE_STATUS_FILTERS)[number]["value"];

export type MyProjectStatusType =
  (typeof MY_PROJECT_STATUS_FILTERS)[number]["value"];

export type MyChallengesParams = {
  isMember?: boolean;
  isHost?: boolean;
  hasPendingApplication?: boolean;
  status?: MyChallengeStatusType;
  page?: number;
  limit?: number;
};

export type MyChallengesResponse = ChallengesResponse;
export type MyProjectsResponse = ProjectsResponse;

export type MyProjectsParams = {
  isMember?: boolean;
  isHost?: boolean;
  hasPendingApplication?: boolean;
  status?: MyProjectStatusType;
  start?: number;
  perPage?: number;
};

export type MyCommentsParams = {
  start?: number;
  perPage?: number;
  type?: "project" | "challenge"; // 없으면 전체
};

export interface MyComment {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  type: "project" | "challenge";
  targetId: number; // 프로젝트/챌린지 ID
  title: string;
  user: User;
}

export interface MyCommentResponse {
  data: MyComment[];
  total: number;
}
