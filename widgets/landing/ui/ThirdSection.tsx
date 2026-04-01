"use client";

import Image from "next/image";

const projectCards = [
  {
    id: 1,
    title: "포트폴리오",
    image: "/landing/portfolio.svg",
    alt: "포트폴리오 아이콘",
  },
  {
    id: 2,
    title: "공모전",
    image: "/landing/contest.svg",
    alt: "공모전 아이콘",
  },
  {
    id: 3,
    title: "해커톤",
    image: "/landing/hackathon.svg",
    alt: "해커톤 아이콘",
  },
  {
    id: 4,
    title: "창업",
    image: "/landing/startup.svg",
    alt: "창업 아이콘",
  },
];

export default function ThirdSection() {
  return (
    <section className="bg-gray-900 px-5 py-20 md:px-10 md:py-28 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto flex max-w-170 flex-col gap-7 text-center">
          <p className="text-mint-500 text-lg font-semibold">{"// PROJECT"}</p>

          <h2 className="text-2xl leading-tight font-bold md:text-5xl">
            내 포지션에 딱 맞는
            <br />
            실전 프로젝트 탐색
          </h2>

          <p className="text-base leading-8 text-gray-400 md:text-xl">
            목적과 포지션에 맞춰 팀원을 찾거나 합류하세요.
            <br />
            실무와 가장 가까운 협업 경험을 제공합니다.
          </p>
        </div>

        <div className="mt-30 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
          {projectCards.map((card) => (
            <div
              key={card.id}
              className="group hover:border-mint-500 relative h-92 overflow-hidden rounded-3xl border border-[#334155] bg-[#334155]/20 pt-8"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00A67B]/10 font-semibold">
                  {card.id}
                </div>

                <h3 className="text-2xl font-bold text-[#e2e8f0]">
                  {card.title}
                </h3>
              </div>

              <div className="absolute right-0 bottom-0 transition-transform duration-300 group-hover:scale-105 group-hover:opacity-100">
                <Image
                  src={card.image}
                  alt={card.alt}
                  width={240}
                  height={240}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
