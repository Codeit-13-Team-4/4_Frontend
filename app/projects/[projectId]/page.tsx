import ProjectDetailCard from "@/widgets/projectsDetail/ui/ProjectDetailCard";

export default async function ProjectsDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const id = Number(projectId);

  return <ProjectDetailCard projectId={id} />;
}
