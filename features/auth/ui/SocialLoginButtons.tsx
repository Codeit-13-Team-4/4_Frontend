"use client";

import Image from "next/image";
import { useState } from "react";
import {
  getSocialLoginUrl,
  type SocialProvider,
} from "@/features/auth/api/getSocialLoginUrl";
import { Button } from "@/shared/ui";

interface SocialButton {
  provider: SocialProvider;
  label: string;
  className: string;
  logo: string;
}

const SOCIAL_BUTTONS: SocialButton[] = [
  {
    provider: "google",
    logo: "/google.svg",
    label: "구글로 계속하기",
    className: "w-full border-none bg-white text-slate-800 hover:bg-slate-100",
  },
  {
    provider: "kakao",
    logo: "/kakao.svg",
    label: "카카오로 계속하기",
    className:
      "w-full border-none bg-[#FFEE01] text-slate-800 hover:bg-[#f5e400]",
  },
  {
    provider: "github",
    logo: "/github.svg",
    label: "Github로 계속하기",
    className: "w-full border-none bg-white text-slate-800 hover:bg-slate-100",
  },
];

export default function SocialLoginButtons() {
  const [isPending, setIsPending] = useState(false);

  const handleSocialLogin = (provider: SocialProvider) => {
    if (isPending) return;

    setIsPending(true);

    const startUrl = getSocialLoginUrl(provider);
    window.location.assign(startUrl);
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
