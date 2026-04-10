"use client";

import { useRouter } from "next/navigation";
import { useLikeLoginGuard } from "@/features/liked/hooks/useLikeLoginGuard";
import { useOptimisticLikedToggle } from "@/features/liked/hooks/useOptimisticLikedToggle";
import {
  likedProjectKeys,
  type LikedProjectCardData,
} from "@/features/liked/model";
import { toggleProjectLike } from "@/features/projectsDetail/api/toggleProjectLike";
import { projectKeys } from "@/features/projects/model/projects.queryKey";
import type { ProjectDetail } from "@/features/projectsDetail/types/projectsDetail";
import {
  PositionBadgeList,
  ProjectBadge,
  TechStackList,
} from "@/features/projects/ui";
import { DeadlineBadge, LikeButton, StatusBadge } from "@/shared/ui";

export function LikedProjectCard({ data }: { data: LikedProjectCardData }) {
  const {
    title,
    projectType,
    techStacks,
    positions,
    recruitEndDate,
    status,
    maxMembers,
    id,
    liked,
  } = data;

  const router = useRouter();
  const requireLikeLogin = useLikeLoginGuard();
  const { mutate: toggleLike, isPending } = useOptimisticLikedToggle<
    LikedProjectCardData,
    ProjectDetail
  >({
    itemId: id,
    detailQueryKey: projectKeys.detail(id),
    likedListsQueryKey: likedProjectKeys.lists(),
    additionalInvalidateQueryKeys: [projectKeys.lists()],
    mutationFn: (currentLiked: boolean) => toggleProjectLike(id, currentLiked),
    updateDetail: (detail, nextLiked) => ({ ...detail, liked: nextLiked }),
  });

  const handleLikeToggle = () => {
    requireLikeLogin(() => toggleLike(liked));
  };

  const handleCardClick = () => {
    router.push(`/projects/${id}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className="flex h-100 w-full cursor-pointer flex-col gap-4 rounded-[20px] border-2 border-gray-700 bg-gray-800 px-4 pt-6 pb-5"
    >
      <header className="flex items-center justify-between">
        <div className="flex gap-2">
          <StatusBadge status={status} />
          <ProjectBadge type={projectType} />
        </div>

        <div onClick={(event) => event.stopPropagation()}>
          <LikeButton
            liked={liked}
            onToggle={handleLikeToggle}
            disabled={isPending}
          />
        </div>
      </header>
      <div className="flex flex-col gap-6">
        <section className="flex flex-col">
          <div className="mb-2 flex items-center justify-between gap-1">
            <h4 className="line-clamp-1 text-[20px] text-gray-50">{title}</h4>
          </div>
          <p className="text-[14px] text-gray-400">모집 인원 {maxMembers}명</p>
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

      <footer className="mt-auto flex justify-between">
        <div />

        <DeadlineBadge
          endDate={recruitEndDate}
          className="self-start text-nowrap"
        />
      </footer>
    </article>
  );
}
