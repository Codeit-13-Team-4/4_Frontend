"use client";

import { useProjectsDetail } from "@/features/projects/detail/hooks/useProjectsDetail";
import ProjectDetailHeader from "@/features/projects/detail/ui/ProjectDetailHeader";
import ProjectDetailInfoPanel from "@/features/projects/detail/ui/ProjectDetailInfoPanel";
import ProjectDetailHostActions from "@/features/projects/detail/ui/ProjectDetailHostActions";
import { MemberPanel } from "@/features/projects/detail/ui/MemberPanel";
import CommentSection from "./CommentSection";
import MemberSection from "./MemberSection";
import ProjectDetailTabs from "./ProjectDetailTabs";
import { Separator } from "@/shared/ui";
import { TiptapViewer } from "@/shared/ui/TiptapEditor/TiptapViewer";

export default function ProjectDetail({ projectId }: { projectId: number }) {
  const { data: project } = useProjectsDetail(projectId);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] lg:gap-x-10 lg:gap-y-5">
      <ProjectDetailHeader project={project} />

      {/* lg 사이즈 InfoPanel + MemberPanel */}
      <div className="my-5 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:my-0 lg:flex lg:flex-col lg:gap-6">
        <ProjectDetailInfoPanel project={project} />
        <MemberPanel
          projectId={projectId}
          isHost={project.isHost}
          className="hidden rounded-[20px] border border-gray-700 bg-gray-800 px-5 py-6 lg:block"
        />
      </div>

      <ProjectDetailTabs />

      <div>
        <Separator className="mt-5 mb-4 bg-gray-700 md:mt-0 md:mb-0 lg:mb-0" />
        {project.isHost && <ProjectDetailHostActions projectId={projectId} />}
      </div>

      <div id="detail-section">
        <TiptapViewer content={project.description} />
      </div>

      {/* md 이하에서만 표시 */}
      <div className="lg:hidden">
        <MemberSection projectId={projectId} isHost={project.isHost} />
      </div>

      <div id="comment-section" className="lg:col-start-1">
        <CommentSection projectId={projectId} />
      </div>
    </div>
  );
}
