import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchChallengesDetail } from "@/features/challenges/detail/hooks/prefetchChallengesDetail";
import ChallengeDetail from "@/widgets/challengesDetail/ui/ChallengeDetail";

export default async function ChallengesPage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const { challengeId } = await params;
  const id = Number(challengeId);

  const queryClient = await prefetchChallengesDetail(id);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ChallengeDetail challengeId={id} />
    </HydrationBoundary>
  );
}
