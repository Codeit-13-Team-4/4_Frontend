interface SocialTokenRequest {
  type: string;
  socialToken: string;
}
interface SocialTokenResponse {
  token: string;
  user: { email: string; name: string };
}

export async function socialToken({
  //타입수정
  type,
  socialToken,
}: SocialTokenRequest): Promise<SocialTokenResponse> {
  const response = await fetch("/api/auth/social/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: type!.trim(),
      socialToken: socialToken.trim(),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "회원가입에 실패했습니다.");
  }

  return data.token;
}
