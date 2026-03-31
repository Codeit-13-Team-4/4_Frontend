"use client";

import { Badge, DeadlineBadge, StatusBadge } from "@/shared/ui";
import type {
  ProjectDetail,
  ProjectType,
} from "@/features/projectsDetail/types/projectsDetail";
import { Heart } from "lucide-react";

const PROJECT_TYPE_LABEL: Record<ProjectType, string> = {
  portfolio: "포트폴리오",
  contest: "공모전",
  hackathon: "해커톤",
  startup: "창업",
  other: "기타",
};

interface ProjectDetailHeaderProps {
  project: ProjectDetail;
}

export default function ProjectDetailHeader({
  project,
}: ProjectDetailHeaderProps) {
  return (
    <div className="mb-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StatusBadge status={project.status} />
          <Badge variant="auto" size="sm">
            {PROJECT_TYPE_LABEL[project.projectType]}
          </Badge>
          <DeadlineBadge endDate={project.recruitEndDate} />
        </div>
        <button
          type="button"
          aria-label="좋아요"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 bg-gray-800 transition-colors hover:border-pink-400"
        >
          <Heart
            className={
              project.liked
                ? "fill-pink-400 stroke-pink-400"
                : "stroke-gray-400"
            }
            size={20}
          />
        </button>
      </div>
      <h1 className="text-2xl font-semibold text-gray-50 lg:text-3xl">
        {project.title}
      </h1>
    </div>
  );
}
