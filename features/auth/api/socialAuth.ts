export type SocialType = "google" | "kakao" | "github";

export interface SocialTokenRequest {
  token: string;
  type: SocialType;
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

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function verifySocialToken({
  token,
  type,
}: SocialTokenRequest): Promise<SocialLoginSuccessResponse> {
  console.log(
    JSON.stringify({
      token,
      type,
    }),
  );

  const response = await fetch(`${BASE_URL}/auth/social/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      token,
      type,
    }),
  });

  if (response.status === 404) {
    throw new Error("NOT_REGISTERED");
  }

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(errorText || "소셜 로그인 처리에 실패했습니다.");
  }

  return response.json();
}
