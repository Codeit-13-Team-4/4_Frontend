import { JobLabelType } from "@/shared/types/user";
import { TechStackKey } from "@/shared/types/techStack";

export interface UpdateProfileRequest {
  nickname: string;
  bio: string;
  jobLabel: JobLabelType;
  skills: TechStackKey[];
  profileImageUrl: string | null;
  githubLink: string;
  blogLink: string;
  portfolioLink: string;
}
