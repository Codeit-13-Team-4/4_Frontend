import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchChallengesDetail } from "@/features/challenges/detail/hooks/prefetchChallengesDetail";
import ChallengeDetail from "@/widgets/challengesDetail/ui/ChallengeDetail";
import { challengeKeys } from "@/features/challenges/model/challenges.queryKey";
import { Metadata } from "next";
import { cleanDescription } from "@/shared/utils";
import { ChallengesDetail } from "@/features/challenges/detail/model/challengesDetail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}): Promise<Metadata> {
  const { challengeId } = await params;
  const id = Number(challengeId);
  const queryClient = await prefetchChallengesDetail(id);
  const challenge = queryClient.getQueryData<ChallengesDetail>(
    challengeKeys.detail(id),
  );

  if (!challenge) {
    return { title: "챌린지를 찾을 수 없습니다" };
  }

  const description = cleanDescription(challenge.description);

  return {
    title: `${challenge.title}`,
    description: description || undefined,
    openGraph: {
      title: `${challenge.title}`,
      description: description || undefined,
    },
    twitter: {
      card: "summary",
      title: `${challenge.title}`,
      description: description || undefined,
    },
  };
}

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
