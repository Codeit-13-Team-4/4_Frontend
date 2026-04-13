import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchProjectsDetail } from "@/features/projects/detail/hooks/prefetchProjectsDetail";
import ProjectDetail from "@/widgets/projectsDetail/ui/ProjectDetail";

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
