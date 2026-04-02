import type { User } from "@/shared/types/user";

export type ProjectType =
  | "portfolio"
  | "contest"
  | "hackathon"
  | "startup"
  | "other";

export type TechStackType =
  | "figma"
  | "golang"
  | "html"
  | "java"
  | "javascript"
  | "mysql"
  | "nestjs"
  | "nodejs"
  | "photoshop"
  | "python"
  | "react"
  | "spring"
  | "typescript"
  | "unity"
  | "vuejs"
  | "aws"
  | "c"
  | "cpp"
  | "django"
  | "docker"
  | "expressjs"
  | "firebase"
  | "flutter"
  | "git"
  | "github"
  | "graphql"
  | "kotlin"
  | "kubernetes"
  | "mongodb"
  | "php"
  | "postgresql"
  | "redis"
  | "supabase"
  | "svelte"
  | "swift"
  | "nextjs";

export type PositionType =
  | "pm"
  | "marketer"
  | "fe"
  | "be"
  | "designer"
  | "ios"
  | "android"
  | "devops";

export type ContactMethodType =
  | "kakao_open_chat"
  | "email"
  | "google_form"
  | "discord";

export type ProjectStatusType =
  | "recruiting"
  | "recruitment_closed"
  | "in_progress"
  | "completed";

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
