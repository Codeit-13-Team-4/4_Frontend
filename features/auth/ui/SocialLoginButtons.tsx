"use client";

import Image from "next/image";
type SocialType = "google" | "kakao" | "github";

const SOCIAL_LOGIN_URL: Record<SocialType, string> = {
  google: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth2/authorization/google?redirectUri=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback/google`)}`,
  kakao: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth2/authorization/kakao?redirectUri=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback/kakao`)}`,
  github: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth2/authorization/github?redirectUri=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback/github`)}`,
};

export default function SocialLoginButtons() {
  const handleSocialLogin = (provider: SocialType) => {
    window.location.href = SOCIAL_LOGIN_URL[provider];
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-black"
      >
        <Image
          src="/auth/google.svg"
          alt="구글 로그인"
          width={20}
          height={20}
        />
        <span>구글로 시작하기</span>
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("kakao")}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-yellow-300 text-black"
      >
        <Image
          src="/auth/kakao.svg"
          alt="카카오 로그인"
          width={20}
          height={20}
        />
        <span>카카오로 시작하기</span>
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("github")}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-slate-800"
      >
        <Image
          src="/auth/github.svg"
          alt="깃허브 로그인"
          width={20}
          height={20}
        />
        <span>GitHub로 시작하기</span>
      </button>
    </div>
  );
}
