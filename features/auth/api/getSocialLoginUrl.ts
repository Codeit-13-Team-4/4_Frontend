export type SocialProvider = "kakao" | "google" | "github";

const SOCIAL_LOGIN_PATH: Record<SocialProvider, string> = {
  kakao: "/auth/oauth/kakao",
  google: "/auth/oauth/google",
  github: "/auth/oauth/github",
};

export function getSocialLoginUrl(provider: SocialProvider) {
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}${SOCIAL_LOGIN_PATH[provider]}`;
}
