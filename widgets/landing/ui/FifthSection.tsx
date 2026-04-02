"use client";

import { useEffect, useMemo, useState } from "react";
import DemoProjectCard, {
  type DemoProjectCardData,
} from "@/widgets/landing/ui/DemoDayCard";

const demoProjects: DemoProjectCardData[] = [
  {
    id: 1,
    title: "SaaS 폼빌더",
    description:
      "프로젝트 소개글입니다. 프로젝트 소개글입니다. 프로젝트 소개글입니다.",
    projectType: "portfolio",
    techStacks: ["React", "Figma", "Typescript", "MySQL", "Python", "Node.js"],
    positions: ["프론트엔드", "백엔드", "디자이너"],
    recruitEndDate: "2026-04-30",
    viewCount: 124,
    commentCount: 18,
    status: "recruiting",
    accent: "blue",
  },
  {
    id: 2,
    title: "사용자 맞춤 러닝 서비스",
    description:
      "프로젝트 소개글입니다. 프로젝트 소개글입니다. 프로젝트 소개글입니다.",
    projectType: "portfolio",
    techStacks: ["React", "Figma", "Typescript", "MySQL", "Python", "Node.js"],
    positions: ["프론트엔드", "백엔드", "기획"],
    recruitEndDate: "2026-05-01",
    viewCount: 98,
    commentCount: 11,
    status: "recruiting",
    accent: "red",
  },
  {
    id: 3,
    title: "AI 영상 제작 서비스",
    description:
      "프로젝트 소개글입니다. 프로젝트 소개글입니다. 프로젝트 소개글입니다.",
    projectType: "portfolio",
    techStacks: ["React", "Figma", "Typescript", "MySQL", "Python", "Node.js"],
    positions: ["프론트엔드", "AI", "디자이너"],
    recruitEndDate: "2026-04-29",
    viewCount: 143,
    commentCount: 23,
    status: "recruiting",
    accent: "purple",
  },
];

const DEMO_DAY_DATE = "2026-04-17T00:00:00+09:00";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const INITIAL_TIME_LEFT: TimeLeft = {
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
};

function getTimeLeft(targetDate: string): TimeLeft {
  const diff = new Date(targetDate).getTime() - Date.now();

  if (diff <= 0) {
    return INITIAL_TIME_LEFT;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

function CountdownCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex h-[88px] w-[68px] flex-col items-center justify-center rounded-[20px] border border-white/12 bg-[#12213f]/72 backdrop-blur-md md:h-[116px] md:w-[94px]">
      <span
        suppressHydrationWarning
        className="text-[28px] leading-none font-bold text-white md:text-[42px]"
      >
        {value}
      </span>
      <span className="mt-2 text-sm text-gray-300 md:text-base">{label}</span>
    </div>
  );
}

export default function FifthSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(INITIAL_TIME_LEFT);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTimeLeft(getTimeLeft(DEMO_DAY_DATE));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const countdownItems = useMemo(
    () => [
      { label: "Days", value: timeLeft.days },
      { label: "Hours", value: timeLeft.hours },
      { label: "Min", value: timeLeft.minutes },
      { label: "Sec", value: timeLeft.seconds },
    ],
    [timeLeft],
  );

  return (
    <section className="overflow-hidden bg-[#071634] px-5 text-white md:px-10 lg:px-16">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <div className="flex max-w-[760px] flex-col items-center gap-7 text-center">
          <p className="text-mint-500 text-lg font-semibold">{"// DEMO DAY"}</p>

          <h2 className="text-3xl leading-tight font-bold md:text-5xl">
            코드를 넘어 서비스로,
            <br />
            <span className="text-mint-500">DevUp 데모데이</span>
          </h2>

          <p className="text-base leading-8 text-gray-400 md:text-xl">
            열심히 만든 서비스를 세상에 선보이는 시간.
            <br />
            네트워킹과 피드백을 통해 한 단계 더 성장합니다.
          </p>
        </div>

        <div className="relative mt-20 w-full">
          <div className="relative mx-auto h-[360px] w-full max-w-[1280px] overflow-hidden md:h-[450px]">
            <div className="pointer-events-none absolute inset-0 z-10 bg-[#071634]/12 backdrop-blur-[2px]" />

            <div className="relative z-0 hidden h-full items-start justify-center gap-6 md:flex">
              {demoProjects.map((project) => (
                <div
                  key={project.id}
                  className="w-[418px] shrink-0 opacity-40 blur-[10px]"
                >
                  <DemoProjectCard data={project} />
                </div>
              ))}
            </div>

            <div className="relative z-0 flex h-full items-start justify-center md:hidden">
              <div className="w-[320px] max-w-[82vw] opacity-40 blur-[60px]">
                <DemoProjectCard data={demoProjects[1]} />
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-[52%] z-20 flex -translate-y-1/2 flex-col items-center px-4 md:top-[60%]">
            <p className="mb-4 text-sm text-gray-300 md:text-base">
              데모데이까지
            </p>

            <div className="flex items-center gap-2 md:gap-4">
              {countdownItems.map((item, index) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 md:gap-4"
                >
                  <CountdownCard value={item.value} label={item.label} />
                  {index < countdownItems.length - 1 && (
                    <span className="pb-6 text-2xl text-[#5a6b92] md:text-3xl">
                      ·
                    </span>
                  )}
                </div>
              ))}
            </div>

            <p className="text-mint-500 mt-6 text-base font-semibold md:text-xl">
              2026. 04. 17 공개 예정
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
