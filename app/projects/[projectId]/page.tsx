import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchProjectsDetail } from "@/features/projects/detail/hooks/prefetchProjectsDetail";
import { projectKeys } from "@/features/projects/model";
import type { ProjectDetail as TProjectDetail } from "@/features/projects/model";
import { cleanDescription } from "@/shared/utils";
import { Metadata } from "next";
import ProjectDetail from "@/widgets/projectsDetail/ui/ProjectDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: string }>;
}): Promise<Metadata> {
  const { projectId } = await params;
  const id = Number(projectId);
  const queryClient = await prefetchProjectsDetail(id);
  const project = queryClient.getQueryData<TProjectDetail>(
    projectKeys.detail(id),
  );

  if (!project) {
    return { title: "프로젝트를 찾을 수 없습니다" };
  }

  const description = cleanDescription(project.description);
  return {
    title: `${project.title}`,
    description: description || undefined,
    openGraph: {
      title: `${project.title}`,
      description: description || undefined,
    },
    twitter: {
      card: "summary",
      title: `${project.title}`,
      description: description || undefined,
    },
  };
}

export default async function ProjectsDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const id = Number(projectId);

  const queryClient = await prefetchProjectsDetail(id);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectDetail projectId={id} />
    </HydrationBoundary>
  );
}
