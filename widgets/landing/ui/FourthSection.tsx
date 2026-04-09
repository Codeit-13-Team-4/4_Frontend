"use client";

import { useEffect, useRef, useState } from "react";
import { CommunityCard } from "@/widgets/landing/ui";

const leftCards = [
  {
    id: 1,
    name: "든든한강아지345",
    date: "2026.03.12",
    content:
      "혹시 이 모임 주 1회 고정인가요?\n시간대 맞으면 꾸준히 참여해보고 싶어요!",
  },
  {
    id: 2,
    name: "시크한돌고래234",
    date: "2026.03.14",
    content:
      "포폴 준비 하러 들어왔는데 진짜 도움 많이 돼요\n혼자 할 때보다 훨씬 동기부여 됩니다🔥",
  },
  {
    id: 3,
    name: "개발하는거북이645",
    date: "2026.03.13",
    content:
      "비슷한 프로젝트 또 있으면 추천해주세요🙏\n요즘 이런 모임 찾고 있었어요!",
  },
  {
    id: 4,
    name: "말랑한수달867",
    date: "2026.03.13",
    content: "이 모임 덕분에 첫 포트폴리오 완성했어요..!\n진짜 감사합니다 🙇‍♀️",
  },
];

const rightCards = [
  {
    id: 5,
    name: "차분한토끼666",
    date: "2026.03.23",
    content: "완전 추천합니다 👍",
  },
  {
    id: 6,
    name: "청량한토끼876",
    date: "2026.03.23",
    content: "저도 여기 참여중인데 다들 열심히 해서 자극 많이 받아요ㅋㅋ",
  },
  {
    id: 7,
    name: "행복한카피바라876",
    date: "2026.03.20",
    content: "초보도 참여 가능할까요?\n해커톤은 처음이라 살짝 고민되네요 😅",
  },
  {
    id: 8,
    name: "코딩하는판다234",
    date: "2026.03.13",
    content:
      "생각보다 빡세기보단 서로 도와주는 분위기라 좋았어요!\n편하게 참여 가능합니다 🙂",
  },
  {
    id: 9,
    name: "배고픈하마788",
    date: "2026.03.13",
    content: "같이 준비하니까 끝까지 하게 되는 게 제일 좋았어요.",
  },
];

interface AnimatedColumnProps {
  cards: { id: number; name: string; date: string; content: string }[];
  direction: "up" | "down";
  play: boolean;
}

function AnimatedColumn({ cards, direction, play }: AnimatedColumnProps) {
  const loopCards = [...cards, ...cards];

  return (
    <div className="h-180 overflow-hidden md:h-190">
      <div
        className={[
          "flex flex-col gap-4 will-change-transform",
          play
            ? direction === "up"
              ? "animate-marquee-up"
              : "animate-marquee-down"
            : "",
        ].join(" ")}
      >
        {loopCards.map((card, index) => (
          <CommunityCard
            key={`${card.id}-${index}`}
            name={card.name}
            date={card.date}
            content={card.content}
          />
        ))}
      </div>
    </div>
  );
}

export function FourthSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPlay(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-gray-900 px-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(280px,420px)_1fr] lg:gap-16">
        <div className="flex flex-col gap-7 text-center">
          <p className="text-mint-500 text-lg font-semibold">
            {"// COMMUNITY"}
          </p>

          <h2 className="text-2xl leading-tight font-bold text-gray-50 md:text-5xl">
            미리 엿보는
            <br />
            모임의 분위기
          </h2>

          <p className="text-base leading-8 text-gray-400 md:text-xl">
            댓글을 통해 팀 분위기와 진행 방식을 파악하세요.
            <br />
            망설임은 줄이고, 확신을 더해줍니다.
          </p>
        </div>

        <div className="relative h-180 overflow-hidden md:h-190">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-t from-gray-900/0 to-gray-900" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-linear-to-b from-gray-900/0 to-gray-900" />

          <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-2">
            <AnimatedColumn cards={leftCards} direction="up" play={play} />
            <AnimatedColumn cards={rightCards} direction="down" play={play} />
          </div>
        </div>
      </div>
    </section>
  );
}
