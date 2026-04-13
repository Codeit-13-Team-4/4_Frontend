"use client";

import { useProjectsDetail } from "@/features/projects/detail/hooks/useProjectsDetail";
import ProjectDetailHeader from "@/features/projects/detail/ui/ProjectDetailHeader";
import ProjectDetailInfoPanel from "@/features/projects/detail/ui/ProjectDetailInfoPanel";
import ProjectDetailHostActions from "@/features/projects/detail/ui/ProjectDetailHostActions";
import CommentSection from "./CommentSection";
import { Separator } from "@/shared/ui";
import { TiptapViewer } from "@/shared/ui/TiptapEditor/TiptapViewer";

export default function ProjectDetail({ projectId }: { projectId: number }) {
  const { data: project } = useProjectsDetail(projectId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] lg:gap-x-10 lg:gap-y-5">
      <ProjectDetailHeader project={project} />

      <div className="my-5 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:my-0">
        <ProjectDetailInfoPanel project={project} />
      </div>

      <div>
        <Separator className="mt-5 mb-4 bg-gray-700 md:mt-0 md:mb-6 lg:mb-0" />
        {project.isHost && <ProjectDetailHostActions projectId={projectId} />}
      </div>

      <TiptapViewer content={project.description} />

      <div className="lg:col-start-1">
        <CommentSection projectId={projectId} />
      </div>
    </div>
  );
}
