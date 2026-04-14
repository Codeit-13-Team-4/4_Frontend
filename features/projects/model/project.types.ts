import type { User } from "@/shared/types/user";
import {
  CONTACT_METHOD,
  POSITION_LABELS,
  SORT_LABEL,
  TECH_STACK,
} from "@/features/projects/model";

export type ProjectFilterOptions = { value: string; label: string };

export type TechStackType = keyof typeof TECH_STACK;
export type PositionType = keyof typeof POSITION_LABELS;
export type ContactMethod = keyof typeof CONTACT_METHOD;
export type ContactMethodType = ContactMethod;

export type ProjectType =
  | "portfolio"
  | "contest"
  | "hackathon"
  | "startup"
  | "other";

export type ProjectStatus =
  | "recruiting"
  | "recruitment_closed"
  | "in_progress"
  | "completed";

export type ProjectStatusType = ProjectStatus;

export type ApplicationStatusType = "pending" | "approved" | "rejected";

export type RejectionType =
  | "position_limit"
  | "condition_not_met"
  | "internal_standard"
  | "custom";

export interface ApplicationType {
  id: number;
  status: ApplicationStatusType;
  rejectionType: RejectionType;
  rejectionText: string;
}

export interface ProjectHost {
  id: number;
  nickname: string;
  jobLabel: PositionType[];
  profileImageUrl: string;
  skills: TechStackType[];
}

// 프로젝트 리스트
export interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  projectType: ProjectType;
  techStacks: TechStackType[];
  positions: PositionType[];
  maxMembers: number;
  currentMembers: number;
  recruitEndDate: string;
  projectStartDate: string;
  projectEndDate: string;
  contactMethod: ContactMethod;
  contactLink: string;
  status: ProjectStatus;
  viewCount: number;
  commentCount: number;
  liked: boolean;
  hasApplication: boolean;
  applicationStatus: ApplicationStatusType | null;
  application: ApplicationType | null;
  isHost: boolean;
  isMember: boolean;
  host: ProjectHost;
}

export type ProjectFilter = {
  keyword?: string;
  status?: string;
  projectType?: string[];
  positions?: string[];
  sort?: string;
  start?: number;
  perPage?: number;
};

export type ProjectSortType = keyof typeof SORT_LABEL;

export interface ProjectAlertModalProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  id?: number;
}

export interface ProjectsResponse {
  data: ProjectCardProps[];
  total: number;
}

// 프로젝트 상세
export interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  projectType: ProjectType;
  techStacks: TechStackType[];
  positions: PositionType[];
  maxMembers: number;
  currentMembers: number;
  recruitEndDate: string;
  projectStartDate: string;
  projectEndDate: string;
  contactMethod: ContactMethodType;
  contactLink: string;
  status: ProjectStatusType;
  viewCount: number;
  commentCount: number;
  liked: boolean;
  hasApplication: boolean;
  applicationStatus: ApplicationStatusType | null;
  application: ApplicationType | null;
  isMember: boolean;
  isHost: boolean;
  host: ProjectHost;
}

export interface ProjectsDetailResponse {
  data: ProjectDetail[];
  total: number;
}

// 댓글
type CommentUserType = Pick<
  User,
  "id" | "nickname" | "jobLabel" | "profileImageUrl" | "skills"
>;

export interface Comment {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  user: CommentUserType;
}

export interface CommentsResponse {
  data: Comment[];
  total: number;
}

// 프로젝트 멤버 목록 조회
export interface ProjectMemberList {
  id: number;
  userId: number;
  memberType: "HOST" | "MEMBER";
  position: string | null;
  joinedAt: string;
  user: Pick<
    User,
    "id" | "nickname" | "jobLabel" | "profileImageUrl" | "skills"
  >;
}

export interface ProjectMemberResponse {
  data: ProjectMemberList[];
  total: number;
}
