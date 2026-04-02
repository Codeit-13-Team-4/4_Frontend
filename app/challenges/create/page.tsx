import { getMeServer } from "@/features/auth/api/getMeServer";
import { ChallengesCreateForm } from "@/features/challenges/ui";
import { redirect } from "next/navigation";

export default async function ChallengesCreatePage() {
  const user = await getMeServer();
  if (!user) redirect("/login");

  return <ChallengesCreateForm />;
}
