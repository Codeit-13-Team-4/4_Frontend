"use client";

import { useRouter } from "next/navigation";
import { GradientButton } from "@/shared/ui";
import { TypingText } from "@/widgets/landing/ui";
import Image from "next/image";

export function FirstSection() {
  const router = useRouter();

  function handleClickExplore() {
    router.push("/login");
  }

  return (
    <main className="flex flex-col bg-gray-900">
      <div className="flex-1">
        <section className="relative flex overflow-hidden px-5 pt-24 pb-20 md:px-10 md:pt-32 md:pb-28 lg:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,215,160,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,215,160,0.08)_1px,transparent_1px)] bg-size-[64px_64px]" />

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,215,160,0.18),transparent_60%)]" />

          <div className="relative z-10 mx-auto flex w-full max-w-360 flex-col items-center text-center">
            <TypingText
              text="개발 공부, 아직도 혼자해?"
              speed={100}
              className="font-semibold text-white md:text-[28px]"
            />

            <h1 className="flex leading-tight font-bold text-white md:text-5xl">
              이제 Dev<div className="text-[#27e0b3]">Up</div>에서 함께
            </h1>

            <div className="relative mt-10">
              <span className="text-8xl font-extrabold tracking-wide text-[#27e0b3] uppercase drop-shadow-[0_0_18px_rgba(39,224,179,0.85)]">
                LEVEL UP!
              </span>
            </div>

            <p className="mt-10 text-sm leading-7 text-gray-400 md:text-xl">
              스터디 · 챌린지 · 사이드 프로젝트를 하나로.
              <br />
              성장에 진심인 2030 개발자들의 모임 플랫폼.
            </p>

            <GradientButton
              size="lg"
              variant="dark"
              onClick={handleClickExplore}
              className="mt-30"
            >
              지금 바로 모임 탐색하기
            </GradientButton>
            <Image
              src="images/first-section-down-icon.svg"
              alt="down Image"
              width={41}
              height={41}
              className="mt-30 animate-bounce"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
