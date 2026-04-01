"use client";
import { DeadlineBadge, GradientButton, StatusBadge } from "@/shared/ui";
import Image from "next/image";
import { useState } from "react";
import {
  LikeButton,
  PositionBadgeList,
  ProjectApplyModal,
  ProjectBadge,
  TechStackList,
} from "@/features/projects/ui";
import { ProjectCardProps } from "@/features/projects/model";
import { useRouter } from "next/navigation";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";

export function ProjectCard({ data }: { data: ProjectCardProps }) {
  const {
    title,
    description,
    projectType,
    techStacks,
    positions,
    recruitEndDate,
    viewCount,
    status,
    commentCount,
    id,
  } = data;

  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { data: userData } = useUserData();

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userData) {
      router.push("/login");
      return;
    }
    setIsOpen(true);
  };

  const handleCardClick = () => {
    if (isOpen) return;
    router.push(`/projects/${id}`);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <article
      onClick={handleCardClick}
      className="flex h-100 w-104.5 cursor-pointer flex-col gap-4 rounded-[20px] border-2 border-gray-700 bg-gray-800 px-5 pt-8 pb-5 md:h-130.5 md:w-85.5 lg:h-133"
    >
      <header className="flex items-center justify-between">
        <div className="flex gap-2">
          <StatusBadge status={status} />
          <ProjectBadge type={projectType} />
        </div>

        <LikeButton />
      </header>
      <div className="flex flex-col gap-6">
        <section className="flex flex-col lg:min-h-27.5">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="line-clamp-2 text-[20px] text-gray-50">{title}</h4>
            <DeadlineBadge
              endDate={recruitEndDate}
              className="self-start text-nowrap"
            />
          </div>
          <p className="hidden text-[14px] text-gray-400 md:visible md:line-clamp-1 lg:line-clamp-2">
            {description}
          </p>
        </section>
        <section className="lg:min-h-26">
          <h5 className="mb-2 text-[16px] text-gray-400">기술스택</h5>
          <TechStackList techs={techStacks} />
        </section>
        <section className="min-h-25.5">
          <h5 className="mb-2 text-[16px] text-gray-400">모집 포지션</h5>
          <PositionBadgeList positions={positions} />
        </section>
      </div>

      <footer className="mt-auto flex justify-between">
        <div className="flex gap-6">
          <div className="flex items-center gap-1.25">
            <Image
              src="/icons/common/visibility_on-icon.svg"
              alt=""
              width={24}
              height={24}
            />
            <span className="text-[14px] text-gray-400">{viewCount}</span>
          </div>
          <div className="flex items-center gap-1.25">
            <Image
              src="/icons/common/comment-icon.svg"
              alt=""
              width={24}
              height={24}
            />
            <span className="text-[14px] text-gray-400">{commentCount}</span>
          </div>
        </div>

        <GradientButton
          size="sm"
          onClick={handleOpen}
          disabled={status === "recruitment_closed"}
        >
          지원하기
        </GradientButton>
        <ProjectApplyModal
          isOpen={isOpen}
          onClose={handleClose}
          setIsOpen={setIsOpen}
          projectId={String(id)}
        />
      </footer>
    </article>
  );
}
