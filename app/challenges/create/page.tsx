import { getMeServer } from "@/features/auth/api/getMeServer";
import { buildLoginPath } from "@/features/auth/lib/authRedirect";
import { ChallengesCreateForm } from "@/features/challenges/create/ui/ChallengesCreateForm/ChallengesCreateForm";
import { redirect } from "next/navigation";

export default async function ChallengesCreatePage() {
  const user = await getMeServer();
  if (!user) redirect(buildLoginPath("/challenges/create"));

  return <ChallengesCreateForm />;
}
