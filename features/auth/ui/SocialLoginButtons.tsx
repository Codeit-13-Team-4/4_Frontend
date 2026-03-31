"use client";

import Image from "next/image";
import { useState } from "react";
import {
  getSocialLoginUrl,
  type SocialType,
} from "@/features/auth/api/getSocialLoginUrl";
import { Button } from "@/shared/ui";
import { toast } from "@/shared/utils/toast/toast";

interface SocialButton {
  provider: SocialType;
  label: string;
  className: string;
  logo: string;
}

const SOCIAL_BUTTONS: SocialButton[] = [
  {
    provider: "google",
    logo: "/auth/google.svg",
    label: "구글로 계속하기",
    className: "w-full border-none bg-white text-slate-800 hover:bg-slate-100",
  },
  {
    provider: "kakao",
    logo: "/auth/kakao.svg",
    label: "카카오로 계속하기",
    className:
      "w-full border-none bg-[#FFEE01] text-slate-800 hover:bg-[#f5e400]",
  },
  {
    provider: "github",
    logo: "/auth/github.svg",
    label: "Github로 계속하기",
    className: "w-full border-none bg-white text-slate-800 hover:bg-slate-100",
  },
];

export default function SocialLoginButtons() {
  const [isPending, setIsPending] = useState(false);

  const kakaoRedirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const googleRedirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;
  const githubRedirectUri = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI;

  const redirectUriMap = {
    google: googleRedirectUri,
    kakao: kakaoRedirectUri,
    github: githubRedirectUri,
  };

  const handleSocialLogin = async (provider: SocialType) => {
    if (isPending) return;
    setIsPending(true);

    const socialLoginReqJson = {
      //요청 보내는거 하나의 변수로 묶음
      type: provider,
      redirectUri: redirectUriMap[provider],
    };

    if (!redirectUriMap[provider]) {
      //uri가 없는 경우 - 예외처리
      toast("로그인 도중 문제가 발생했습니다.");
      return;
    }

    const { url } = await getSocialLoginUrl(socialLoginReqJson); //응답값 = 요청보낼 값 파라미터로 타입, 리다이렉트uri호출
    window.location.replace(url); //구조분해한걸로 이동
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center gap-4">
        <div className="h-px flex-1 bg-slate-300" />
        <span className="shrink-0 text-sm text-slate-500">
          SNS 계정으로 로그인
        </span>
        <div className="h-px flex-1 bg-slate-300" />
      </div>

      <div className="flex flex-col gap-3">
        {SOCIAL_BUTTONS.map(({ provider, label, className, logo }) => (
          <Button
            key={provider}
            type="button"
            variant="default"
            className={className}
            disabled={isPending}
            onClick={() => handleSocialLogin(provider)}
          >
            <div className="flex items-center justify-center gap-3">
              <Image
                src={logo}
                alt={`${provider} 로고`}
                width={20}
                height={20}
              />
              <span>{label}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
