import type {
  ChallengeCardProps,
  ParticipationType,
} from "@/features/challenges/model";
import type {
  PositionType,
  ProjectStatus,
  ProjectType,
  TechStackType,
} from "@/features/projects/model";

export type LikedSortType = "latest" | "popular" | "deadline" | "oldest";

export interface LikedChallengeFilter {
  status?: string;
  participationType?: ParticipationType;
  sort?: LikedSortType;
  start?: number;
  perPage?: number;
}

export interface LikedChallengeListItem {
  id: number;
  challengeId: number;
  createdAt: string;
}

export interface BackendLikedChallengeListResponse {
  data: LikedChallengeListItem[];
  total: number;
}

export interface LikedChallengeListResponse {
  data: ChallengeCardProps[];
  total: number;
}

export interface LikedProjectFilter {
  status?: string;
  projectType?: string[];
  positions?: string[];
  sort?: LikedSortType;
  start?: number;
  perPage?: number;
}

export interface LikedProjectSummary {
  id: number;
  title: string;
  projectType: ProjectType;
  techStacks: TechStackType[];
  positions: PositionType[];
  maxMembers: number;
  recruitEndDate: string;
  status: ProjectStatus;
}

export interface LikedProjectListItem {
  id: number;
  createdAt: string;
  project: LikedProjectSummary;
}

export interface BackendLikedProjectListResponse {
  data: LikedProjectListItem[];
  total: number;
}

export interface LikedProjectCardData {
  id: number;
  title: string;
  projectType: ProjectType;
  techStacks: TechStackType[];
  positions: PositionType[];
  maxMembers: number;
  recruitEndDate: string;
  status: ProjectStatus;
  liked: boolean;
}

export interface LikedProjectListResponse {
  data: LikedProjectCardData[];
  total: number;
}
