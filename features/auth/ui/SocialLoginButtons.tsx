"use client";

import { useSearchParams } from "next/navigation";
import {
  buildPathWithQuery,
  getSafeRedirectPath,
} from "@/features/auth/lib/authRedirect";
import { Github, Google, Kakao } from "@/shared/icons";

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
      <button
        type="button"
        onClick={() => handleSocialLogin("google")}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-black"
      >
        <Google width={20} height={20} />
        <span>구글로 시작하기</span>
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("kakao")}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-yellow-300 text-black"
      >
        <Kakao width={20} height={20} />
        <span>카카오로 시작하기</span>
      </button>

      <button
        type="button"
        onClick={() => handleSocialLogin("github")}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-slate-800"
      >
        <Github width={20} height={20} />
        <span>GitHub로 시작하기</span>
      </button>
    </div>
  );
}
