"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  buildPathWithQuery,
  getSafeRedirectPath,
} from "@/features/auth/lib/authRedirect";

type SocialType = "google" | "kakao" | "github";

export default function SocialLoginButtons() {
  const searchParams = useSearchParams();
  const redirectPath = getSafeRedirectPath(searchParams.get("redirect"));

  const handleSocialLogin = (provider: SocialType) => {
    const callbackPath = buildPathWithQuery(`/auth/callback/${provider}`, {
      redirect: redirectPath,
    });
    const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL}${callbackPath}`;
    const socialLoginUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/oauth2/authorization/${provider}?redirect_uri=${encodeURIComponent(callbackUrl)}`;

    window.location.href = socialLoginUrl;
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex w-full items-center gap-3 sm:gap-4">
        <div className="h-px min-w-0 flex-1 bg-slate-300" />
        <span className="shrink-0 text-sm text-slate-500">
          SNS 계정으로 로그인
        </span>
        <div className="h-px min-w-0 flex-1 bg-slate-300" />
      </div>

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
    </div>
  );
}
