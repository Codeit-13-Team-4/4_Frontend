"use client";

import { DeadlineBadge, LikeButton, StatusBadge } from "@/shared/ui";
import {
  PositionBadgeList,
  ProjectBadge,
  TechStackList,
} from "@/features/projects/ui";
import { ProjectCardProps } from "@/features/projects/model";
import { useRouter } from "next/navigation";
import { useToggleProjectLike } from "@/features/projects/hooks/useToggleProjectLike";
import { CommentIcon, Eyeopen } from "@/shared/icons";
import { useLoginGuard } from "@/shared/hooks/useLoginGuard";

export function ProjectCard({ data }: { data: ProjectCardProps }) {
  const {
    title,
    projectType,
    techStacks,
    positions,
    recruitEndDate,
    viewCount,
    status,
    commentCount,
    id,
    liked,
  } = data;

  const router = useRouter();
  const withLoginGuard = useLoginGuard();
  const { mutate: toggleLike } = useToggleProjectLike(id);

  const handleLikeToggle = () => {
    withLoginGuard(
      () => toggleLike(liked),
      "좋아요 기능은 로그인 후 이용할 수 있습니다.",
    );
  };

  const handleCardClick = () => {
    router.push(`/projects/${id}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className="flex w-full cursor-pointer flex-col gap-8 rounded-[20px] border-2 border-gray-700 bg-gray-800 px-4 pt-6 pb-5"
    >
      <div className="flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <div className="flex gap-2">
            <StatusBadge status={status} />
            <ProjectBadge type={projectType} />
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            <LikeButton liked={liked} onToggle={handleLikeToggle} />
          </div>
        </header>
        <div className="flex flex-col gap-6">
          <section className="flex flex-col">
            <div className="mb-2 flex items-center justify-between gap-1">
              <h4 className="line-clamp-1 text-[20px] text-gray-50">{title}</h4>
            </div>
          </section>

          <section>
            <h5 className="mb-2 text-gray-400">모집 포지션</h5>
            <PositionBadgeList positions={positions} />
          </section>
          <section>
            <h5 className="mb-2 text-gray-400">기술스택</h5>
            <TechStackList techs={techStacks} />
          </section>
        </div>
      </div>

      <footer className="mt-auto flex justify-between">
        <div className="flex gap-6">
          <div className="flex items-center gap-1.25">
            <Eyeopen width={24} height={24} className="text-gray-400" />
            <span className="text-[14px] text-gray-400">{viewCount}</span>
          </div>
          <div className="flex items-center gap-1.25">
            <CommentIcon width={24} height={24} className="text-gray-400" />
            <span className="text-[14px] text-gray-400">{commentCount}</span>
          </div>
        </div>

        <DeadlineBadge
          endDate={recruitEndDate}
          className="self-start text-nowrap"
        />
      </footer>
    </article>
  );
}
