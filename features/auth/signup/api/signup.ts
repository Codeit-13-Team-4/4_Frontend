import type { SocialType } from "@/features/auth/api/socialLogin";
import { fetchClient } from "@/shared/lib/client/fetchClient";
import type { JobLabelType } from "@/shared/types/user";

interface SocialSignupRequest {
  type: SocialType;
  token: string;
  email: string;
  nickname: string;
  jobLabel: JobLabelType;
}
interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
  jobLabel: JobLabelType;
}

interface SignupResponse {
  message: string;
  user: {
    id: number;
    email: string;
    nickname: string;
    createdAt: string;
  };
}

export async function signup(payload: SignupRequest): Promise<SignupResponse> {
  const response = await fetchClient("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: payload.email,
      nickname: payload.nickname,
      password: payload.password,
      jobLabel: payload.jobLabel,
    }),
  });

  return response.json();
}

export async function socialSignup(
  payload: SocialSignupRequest,
): Promise<SignupResponse> {
  const response = await fetchClient("/api/auth/socialsignup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: payload.type,
      token: payload.token,
      email: payload.email,
      nickname: payload.nickname,
      jobLabel: payload.jobLabel,
    }),
  });

  return response.json();
}
