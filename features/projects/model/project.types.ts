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
