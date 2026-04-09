"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

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
    <div className="flex h-22 w-17 flex-col items-center justify-center rounded-3xl border border-white/12 bg-gray-800/20 backdrop-blur-md md:h-29 md:w-23.5">
      <span
        suppressHydrationWarning
        className="text-[28px] leading-none font-bold text-gray-50 md:text-[42px]"
      >
        {value}
      </span>
      <span className="mt-2 text-sm text-gray-400 md:text-base">{label}</span>
    </div>
  );
}

export function FifthSection() {
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
    <section className="relative h-200 overflow-hidden bg-gray-900 md:h-250">
      <Image
        src="/images/fifth-section-pc.png"
        alt="배경"
        fill
        className="hidden object-cover md:block"
      />
      <Image
        src="/images/fifth-section-mobile.png"
        alt="배경"
        fill
        className="block md:hidden"
      />
      <div className="flex h-full flex-col items-center py-20">
        <div className="z-10 flex max-w-190 flex-col items-center gap-7 text-center">
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

        <div className="z-10 mt-auto text-center">
          <p className="mb-4 text-sm text-gray-300 md:text-base">
            데모데이까지
          </p>

          <div className="mb-4 flex items-center gap-2 md:gap-4">
            {countdownItems.map((item, index) => (
              <div
                key={item.label}
                className="flex items-center gap-2 md:gap-4"
              >
                <CountdownCard value={item.value} label={item.label} />
                {index < countdownItems.length - 1 && (
                  <span className="flex items-center text-2xl text-[#5a6b92] md:text-3xl">
                    <svg
                      width="5"
                      height="22"
                      viewBox="0 0 5 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="2.5" r="2.5" fill="#334155" />
                      <circle cx="2.5" cy="19.5" r="2.5" fill="#334155" />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>

          <p
            className="pt-4 font-semibold md:text-xl"
            style={{
              background: "var(--color-gradient-devup)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            2026. 04. 17 공개 예정
          </p>
        </div>
      </div>
    </section>
  );
}
