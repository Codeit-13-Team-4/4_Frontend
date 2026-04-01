"use client";

import ProjectDetailHeader from "@/features/projectsDetail/ui/ProjectDetailHeader";
import ProjectDetailLeftPanel from "@/features/projectsDetail/ui/ProjectDetailLeftPanel";
import ProjectDetailRightPanel from "@/features/projectsDetail/ui/ProjectDetailRightPanel";
import { useProjectsDetail } from "@/features/projectsDetail/hooks/useProjectsDetail";
import ProjectDetailFooter from "@/features/projectsDetail/ui/ProjectDetailFooter";
import ProjectDetailCardSkeleton from "@/widgets/projectsDetail/ui/ProjectDetailCardSkeleton";
import BackButton from "@/widgets/projectsDetail/ui/BackButton";
import DeleteProjectButton from "@/widgets/projectsDetail/ui/DeleteProjectButton";
import { useUserData } from "@/features/auth/hooks/queries/useUserData";
import { notFound } from "next/navigation";

interface ProjectDetailCardProps {
  projectId: number;
}

export default function ProjectDetailCard({
  projectId,
}: ProjectDetailCardProps) {
  const { data: project, isError } = useProjectsDetail(projectId);
  const { data: userData } = useUserData();

  if (isError) notFound();
  if (!project) return <ProjectDetailCardSkeleton />;

  const isHost = userData?.id === project.host.id;

  return (
    <>
      <div className="mt-6 mb-5 flex items-center justify-between gap-3 lg:mt-12 lg:mb-10">
        <BackButton />
        {isHost && <DeleteProjectButton projectId={projectId} />}
      </div>
      <div className="w-full rounded-[20px] border border-gray-700 bg-gray-800 px-4 pt-8 pb-6 md:px-8 md:pt-12 md:pb-8 lg:px-10 lg:pt-15 lg:pb-10">
        <ProjectDetailHeader project={project} />
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
          <div className="flex-1">
            <ProjectDetailLeftPanel project={project} />
          </div>
          <div className="flex-1">
            <ProjectDetailRightPanel project={project} />
          </div>
        </div>
        <ProjectDetailFooter project={project} />
      </div>
    </>
  );
}
