import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { getMeServer } from "@/features/auth/api/getMeServer";
import { buildLoginPath } from "@/features/auth/lib/authRedirect";
import { prefetchProjectsDetail } from "@/features/projects/detail/hooks/prefetchProjectsDetail";
import { getProjectsDetailServer } from "@/features/projects/detail/api/getProjectsDetail.server";
import { ProjectsEditForm } from "@/features/projects/edit/ui/ProjectsEditForm";

export default async function ProjectsEditPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const id = Number(projectId);

  const user = await getMeServer();
  if (!user) redirect(buildLoginPath(`/projects/${id}/edit`));

  const project = await getProjectsDetailServer(id);
  if (!project.isHost) redirect(`/projects/${id}`);

  const queryClient = await prefetchProjectsDetail(id);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectsEditForm projectId={id} />
    </HydrationBoundary>
  );
}
