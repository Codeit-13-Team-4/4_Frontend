import { getMeServer } from "@/features/auth/api/getMeServer";
import { buildLoginPath } from "@/features/auth/lib/authRedirect";
import { ProjectCreateForm } from "@/features/projects/create/ui/ProjectCreateForm";
import { redirect } from "next/navigation";

export default async function ProjectCreatePage() {
  const user = await getMeServer();
  if (!user) redirect(buildLoginPath("/projects/create"));

  return <ProjectCreateForm />;
}
