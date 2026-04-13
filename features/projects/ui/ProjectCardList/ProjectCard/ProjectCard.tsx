"use client";
import {
  buildCurrentPath,
  buildLoginPath,
} from "@/features/auth/lib/authRedirect";
import { DeadlineBadge, LikeButton, StatusBadge } from "@/shared/ui";
import {
  PositionBadgeList,
  ProjectBadge,
  TechStackList,
} from "@/features/projects/ui";
import { ProjectCardProps } from "@/features/projects/model";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { useToggleProjectLike } from "@/features/projects/hooks/useToggleProjectLike";
import { useOpenAlertModal } from "@/shared/store/AlertModal";
import { CommentIcon, Eyeopen } from "@/shared/icons";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const loginPath = buildLoginPath(buildCurrentPath(pathname, searchParams));

  const { data: userData } = useUserData();
  const { mutate: toggleLike } = useToggleProjectLike(id);
  const openAlertModal = useOpenAlertModal();

  const handleLikeToggle = () => {
    if (!userData) {
      openAlertModal({
        title: "로그인이 필요합니다",
        description: "좋아요 기능은 로그인 후 이용할 수 있습니다.",
        positive: {
          text: "로그인하기",
          button: { type: "default", variant: "primary" },
        },
        negative: { text: "취소" },
        onPositive: () => router.push(loginPath),
      });
      return;
    }
    toggleLike(liked);
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
            <div className="flex items-center justify-between gap-1">
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
