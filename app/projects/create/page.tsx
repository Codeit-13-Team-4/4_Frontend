import { getMeServer } from "@/features/auth/api/getMeServer";
import { buildLoginPath } from "@/features/auth/lib/authRedirect";
import { ProjectCreateForm } from "@/features/projects/create/ui/ProjectCreateForm";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "프로젝트 생성",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ProjectCreatePage() {
  const user = await getMeServer();
  if (!user) redirect(buildLoginPath("/projects/create"));

  return <ProjectCreateForm />;
}
