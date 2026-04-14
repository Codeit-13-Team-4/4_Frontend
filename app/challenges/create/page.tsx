import { getMeServer } from "@/features/auth/api/getMeServer";
import { buildLoginPath } from "@/features/auth/lib/authRedirect";
import { ChallengesForm } from "@/features/challenges/ui";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "챌린지 생성",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ChallengesCreatePage() {
  const user = await getMeServer();
  if (!user) redirect(buildLoginPath("/challenges/create"));

  return <ChallengesForm />;
}
