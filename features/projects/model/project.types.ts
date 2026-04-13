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

export interface ProjectHost {
  id: number;
  nickname: string;
  jobLabel?: PositionType[];
  profileImageUrl?: string;
  skills?: TechStackType[];
}

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
  host: ProjectHost;
  hasApplication: boolean;
  isHost: boolean;
  applicationStatus: ApplicationStatusType;
}

export type ProjectFilter = {
  keyword?: string;
  status?: string;
  projectType?: string[];
  positions?: string[];
  sort?: string;
  start?: number;
  perPage?: number;
  order?: string;
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

// Detail types (previously in projectsDetail/types/)
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
  host: Pick<
    User,
    "id" | "nickname" | "jobLabel" | "profileImageUrl" | "skills"
  >;
}

export interface ProjectsDetailResponse {
  data: ProjectDetail[];
  total: number;
}

export interface Comment {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  user: Pick<
    User,
    "id" | "nickname" | "jobLabel" | "profileImageUrl" | "skills"
  >;
}

export interface CommentsResponse {
  data: Comment[];
  total: number;
}
