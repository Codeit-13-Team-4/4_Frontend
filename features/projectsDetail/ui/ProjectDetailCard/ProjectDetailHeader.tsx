"use client";

import { DeadlineBadge, LikeButton, StatusBadge } from "@/shared/ui";
import type { ProjectDetail } from "@/features/projectsDetail/types/projectsDetail";
import { useToggleProjectLike } from "@/features/projectsDetail/hooks/useToggleProjectLike";
import { ProjectBadge } from "@/features/projectsDetail/ui/ProjectDetailCard";

interface ProjectDetailHeaderProps {
  project: ProjectDetail;
}

export default function ProjectDetailHeader({
  project,
}: ProjectDetailHeaderProps) {
  const { mutate: toggleLike } = useToggleProjectLike(project.id);

  return (
    <div className="mb-5 flex flex-col gap-4">
      <div className="flex flex-col-reverse items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          <ProjectBadge type={project.projectType} />
          <DeadlineBadge endDate={project.recruitEndDate} />
        </div>
        <LikeButton
          className="ml-auto"
          liked={project.liked}
          onToggle={() => toggleLike(project.liked)}
        />
      </div>
      <h1 className="text-2xl font-semibold text-gray-50 lg:text-3xl">
        {project.title}
      </h1>
    </div>
  );
}
