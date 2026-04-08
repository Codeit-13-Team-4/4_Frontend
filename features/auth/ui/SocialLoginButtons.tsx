"use client";

import Image from "next/image";
type SocialType = "google" | "kakao" | "github";

const SOCIAL_LOGIN_URL: Record<SocialType, string> = {
  google: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth2/authorization/google?redirect_uri=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback/google`)}`,
  kakao: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth2/authorization/kakao?redirect_uri=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback/kakao`)}`,
  github: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth2/authorization/github?redirect_uri=${encodeURIComponent(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback/github`)}`,
};

export default function SocialLoginButtons() {
  const handleSocialLogin = (provider: SocialType) => {
    window.location.href = SOCIAL_LOGIN_URL[provider];
  };

  return (
    <div className="flex justify-center gap-3 sm:flex-col">
      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
        aria-label="구글 로그인"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black sm:w-full sm:gap-2 sm:rounded-xl"
      >
        <Image
          src="/auth/google.svg"
          alt="구글 로그인"
          width={20}
          height={20}
        />
        <span className="hidden sm:inline">구글로 시작하기</span>
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("kakao")}
        aria-label="카카오 로그인"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-yellow-300 text-black sm:w-full sm:gap-2 sm:rounded-xl"
      >
        <Image
          src="/auth/kakao.svg"
          alt="카카오 로그인"
          width={20}
          height={20}
        />
        <span className="hidden sm:inline">카카오로 시작하기</span>
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("github")}
        aria-label="깃허브 로그인"
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-slate-800 sm:w-full sm:gap-2 sm:rounded-xl"
      >
        <Image
          src="/auth/github.svg"
          alt="깃허브 로그인"
          width={20}
          height={20}
        />
        <span className="hidden sm:inline">GitHub로 시작하기</span>
      </button>
    </div>
  );
}
