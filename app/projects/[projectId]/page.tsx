import { getQueryClient } from "@/app/providers/getQueryClient";
import { getProjectDetail } from "@/features/projectsDetail/api/getProjectsDetail";

export default async function ProjectsDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const id = Number(projectId);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["projects", id],
    queryFn: () => getProjectDetail(id),
  });

  return <div>Projects Detail Page입니다</div>;
}
