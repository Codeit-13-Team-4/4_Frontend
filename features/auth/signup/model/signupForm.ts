import type { SocialType } from "@/features/auth/api/socialLogin";
import type { TechStackKey } from "@/shared/types/techStack";
import type { JobLabelType } from "@/shared/types/user";
import { getRandomName } from "@/shared/utils";

export type SignupStep = 1 | 2 | 3;
export type SignupAccountMode = "local" | "social";

export interface SignupFormProps {
  socialSignup?: SocialSignupContext;
}

export interface SocialSignupContext {
  type: SocialType;
  email: string;
  token: string;
  name?: string;
}

export interface SignupFormValues {
  jobLabel: JobLabelType | "";
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
  bio: string;
  skills: TechStackKey[];
  externalLink: string;
}

export function getInitialNickname(name?: string) {
  const trimmedName = name?.trim();
  return trimmedName || getRandomName();
}

export function getSignupDefaultValues({
  socialSignup,
}: {
  socialSignup?: SocialSignupContext;
}): SignupFormValues {
  return {
    jobLabel: "",
    email: socialSignup?.email ?? "",
    password: "",
    passwordConfirm: "",
    nickname: getInitialNickname(socialSignup?.name),
    bio: "",
    skills: [],
    externalLink: "",
  };
}
