import { fetchClient } from "@/shared/lib/client/fetchClient";
import { ApiError } from "@/shared/lib/errors/ApiError";

export type SocialType = "google" | "kakao" | "github";

export interface SocialTokenRequest {
  token: string;
  type: SocialType;
  remember: boolean;
}

export interface SocialLoginSuccessResponse {
  accessToken: string;
  refreshToken?: string;
  user?: {
    id: number;
    email: string;
    nickname?: string;
    name?: string;
  };
}
export async function socialLogin({
  token,
  type,
}: SocialTokenRequest): Promise<SocialLoginSuccessResponse | null> {
  try {
    const response = await fetchClient(`/api/auth/social/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        token,
        type,
        remember: true,
      }),
    });

    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      return response.json();
    }

    return null;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      throw new Error("NOT_REGISTERED");
    }

    throw error;
  }
}
