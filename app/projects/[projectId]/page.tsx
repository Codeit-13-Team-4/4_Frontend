import ProjectDetailCard from "@/widgets/projectsDetail/ui/ProjectDetailCard";
import CommentSection from "@/widgets/projectsDetail/ui/CommentSection";

export default async function ProjectsDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const id = Number(projectId);

  return (
    <>
      <ProjectDetailCard projectId={id} />
      <CommentSection projectId={id} />
    </>
  );
}
