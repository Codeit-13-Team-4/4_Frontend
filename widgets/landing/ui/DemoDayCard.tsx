"use client";

import { DeadlineBadge, GradientButton, StatusBadge } from "@/shared/ui";
import { ProjectBadge } from "@/features/projects/ui";
import { CommentIcon, Eyeopen } from "@/shared/icons";

export interface DemoProjectCardData {
  id: number;
  title: string;
  description: string;
  projectType: "portfolio" | "contest" | "hackathon" | "startup";
  techStacks: string[];
  positions: string[];
  recruitEndDate: string;
  viewCount: number;
  commentCount: number;
  status: "recruiting" | "recruitment_closed";
  accent: "blue" | "red" | "purple";
}

function MockBadge({ label }: { label: string }) {
  return (
    <span className="rounded-lg border border-white/8 bg-[#22304f] px-3 py-2 text-xs text-gray-200">
      {label}
    </span>
  );
}

export default function DemoProjectCard({
  data,
}: {
  data: DemoProjectCardData;
}) {
  const {
    title,
    description,
    projectType,
    techStacks,
    positions,
    recruitEndDate,
    viewCount,
    commentCount,
    status,
    accent,
  } = data;

  return (
    <article className="flex h-[814px] w-[418px] cursor-default flex-col gap-10 rounded-[20px] border-2 border-gray-700 bg-gray-800 px-5 pt-5 pb-10">
      <header className="flex items-center justify-between">
        <div className="flex gap-2">
          <StatusBadge status={status} />
          <ProjectBadge type={projectType} />
        </div>

        <button
          type="button"
          className="border-mint-500/70 text-mint-500 flex h-10 w-10 items-center justify-center rounded-full border"
          aria-label="좋아요"
        >
          ♥
        </button>
      </header>

      <div
        className={`relative overflow-hidden rounded-[18px] border border-white/8 bg-[#0d1730]`}
      >
        <div className="h-[180px] w-full p-5">
          <div className="flex h-full flex-col justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-white/50">
                DevUp Demo Preview
              </p>
              <h3 className="max-w-[220px] text-2xl leading-tight font-bold text-white">
                {title}
              </h3>
            </div>

            <div className="flex items-end justify-between">
              <div className="h-14 w-14 rounded-2xl border border-white/8 bg-white/6" />
              <div className="h-20 w-28 rounded-2xl border border-white/8 bg-white/6" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <section className="flex min-h-[92px] flex-col">
          <div className="mb-2 flex items-center justify-between gap-3">
            <h4 className="line-clamp-2 text-[20px] text-gray-50">{title}</h4>
            <DeadlineBadge
              endDate={recruitEndDate}
              className="self-start text-nowrap"
            />
          </div>

          <p className="line-clamp-2 text-[14px] text-gray-400">
            {description}
          </p>
        </section>

        <section className="min-h-[92px]">
          <h5 className="mb-2 text-[16px] text-gray-400">기술스택</h5>
          <div className="flex flex-wrap gap-2">
            {techStacks.map((tech) => (
              <MockBadge key={tech} label={tech} />
            ))}
          </div>
        </section>

        <section className="min-h-[92px]">
          <h5 className="mb-2 text-[16px] text-gray-400">모집 포지션</h5>
          <div className="flex flex-wrap gap-2">
            {positions.map((position) => (
              <MockBadge key={position} label={position} />
            ))}
          </div>
        </section>
      </div>

      <footer className="mt-auto flex items-center justify-between">
        <div className="flex gap-6">
          <div className="flex items-center gap-1.5">
            <Eyeopen width={24} height={24} />

            <span className="text-[14px] text-gray-400">{viewCount}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <CommentIcon width={24} height={24} />
            <span className="text-[14px] text-gray-400">{commentCount}</span>
          </div>
        </div>

        <GradientButton size="sm" disabled={status === "recruitment_closed"}>
          지원하기
        </GradientButton>
      </footer>
    </article>
  );
}
