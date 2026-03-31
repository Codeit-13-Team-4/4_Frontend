import { Get } from "@/shared/api";

export type SocialType = "kakao" | "google" | "github";

export interface SocialProvider {
  type: SocialType;
  redirectUri: string | undefined;
}

interface SocialLoginResponse {
  url: string;
}

export function getSocialLoginUrl(provider: SocialProvider) {
  const url = `/api/auth/oauth?type=${provider.type}&redirectUri=${encodeURIComponent(provider.redirectUri ?? "")}`;
  return Get<SocialLoginResponse>(url);
}
