export type AccountType = "local" | "google" | "github" | "kakao";

export type JobLabelType =
  | "pm"
  | "marketer"
  | "fe"
  | "be"
  | "designer"
  | "ios"
  | "android"
  | "devops";

export interface User {
  id: number;
  email: string;
  nickname: string;
  jobLabel: JobLabelType;
  bio: string | null;
  profileImageUrl: string | null;
  skills: string[];
  githubLink: string | null;
  blogLink: string | null;
  portfolioLink: string | null;
  accounts: AccountType[];
  stats: {
    projectCount: number;
    challengeCount: number;
  };
  createdAt: string;
}
