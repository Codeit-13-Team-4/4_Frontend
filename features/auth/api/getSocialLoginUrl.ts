export type SocialType = "kakao" | "google" | "github";

export interface SocialProvider {
  type: SocialType;
  redirectUri: string | undefined;
}

export function getSocialLoginUrl(provider: SocialProvider) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  return `${BASE_URL}/auth/oauth2?type=${provider.type}&redirect_uri=${encodeURIComponent(
    provider.redirectUri ?? "",
  )}`;
}
