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
  const response = await fetch(`/api/auth/social/login`, {
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

  console.log(response);
  if (response.status === 404) {
    throw new Error("NOT_REGISTERED");
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(errorText || "소셜 로그인 처리에 실패했습니다.");
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return null;
}
