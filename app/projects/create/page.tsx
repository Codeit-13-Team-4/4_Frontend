import { getMeServer } from "@/features/auth/api/getMeServer";
import { ProjectCreateForm } from "@/features/projects/ui";
import { redirect } from "next/navigation";

export default async function ProjectCreatePage() {
  const user = await getMeServer();
  if (!user) redirect("/login");

  return <ProjectCreateForm />;
}
