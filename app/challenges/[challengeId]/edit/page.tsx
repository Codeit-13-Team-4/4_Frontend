import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { getMeServer } from "@/features/auth/api/getMeServer";
import { buildLoginPath } from "@/features/auth/lib/authRedirect";
import { prefetchChallengesDetail } from "@/features/challenges/detail/hooks/prefetchChallengesDetail";
import { getChallengesDetailServer } from "@/features/challenges/detail/api/getChallengesDetail.server";
import { ChallengesEditForm } from "@/features/challenges/edit/ui/ChallengesEditForm";

export default async function ChallengesEditPage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const { challengeId } = await params;
  const id = Number(challengeId);

  const user = await getMeServer();
  if (!user) redirect(buildLoginPath(`/challenges/${id}/edit`));

  const challenge = await getChallengesDetailServer(id);
  if (!challenge.isHost) redirect(`/challenges/${id}`);

  const queryClient = await prefetchChallengesDetail(id);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChallengesEditForm challengeId={id} />
    </HydrationBoundary>
  );
}
