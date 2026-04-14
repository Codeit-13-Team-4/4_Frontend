"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage, Separator } from "@/shared/ui";
import { StatusBadge, DeadlineBadge } from "@/shared/ui";
import { ProjectBadge } from "@/features/projects/ui";
import type { ProjectDetail } from "@/features/projects/model";
import { ArrowLeft, AvatarIcon, CommentIcon, Eyeopen } from "@/shared/icons";
import { formatDate } from "@/shared/utils";

interface ProjectDetailHeaderProps {
  project: ProjectDetail;
}

export default function ProjectDetailHeader({
  project,
}: ProjectDetailHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => router.back()}
        aria-label="뒤로가기"
        className="my-10 flex w-fit cursor-pointer items-center gap-1 text-sm text-gray-400 transition-colors hover:text-gray-200"
      >
        <ArrowLeft className="h-6 w-6 md:h-8 md:w-8" />
      </button>

      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={project.status} />
        <ProjectBadge type={project.projectType} />
        <DeadlineBadge endDate={project.recruitEndDate} />
      </div>

      <h1 className="flex text-xl font-medium md:text-3xl md:font-semibold">
        {project.title}
      </h1>

      <div className="mt-10 flex flex-col justify-between gap-3 md:mt-15 md:flex-row">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6 md:h-11 md:w-11">
              <AvatarImage
                src={project.host.profileImageUrl ?? ""}
                alt="작성자 프로필"
              />
              <AvatarFallback>
                <AvatarIcon className="h-full w-full text-gray-800" />
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium md:text-base">
              {project.host.nickname}
            </span>
          </div>

          <Separator
            orientation="vertical"
            className="h-6 bg-gray-700 md:h-9"
          />

          <span className="text-xs font-medium text-gray-400 md:text-sm md:font-normal">
            {formatDate(new Date(project.createdAt))}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs font-medium text-gray-400 md:gap-6 md:text-sm">
          <div className="flex items-center gap-1">
            <Eyeopen className="h-4 w-4 md:h-6 md:w-6" />
            <span>{project.viewCount}</span>
          </div>

          <div className="flex items-center gap-1">
            <CommentIcon className="h-4 w-4 md:h-6 md:w-6" />
            <span>{project.commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
