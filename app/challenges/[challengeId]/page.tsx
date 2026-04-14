import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { prefetchChallengesDetail } from "@/features/challenges/detail/hooks/prefetchChallengesDetail";
import ChallengeDetail from "@/widgets/challengesDetail/ui/ChallengeDetail";
import { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Props {
  params: Promise<{ challengeId: string }>;
}

// 1. 메타데이터 생성 함수
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { challengeId } = await params;

  try {
    const response = await fetch(`${BASE_URL}/challenges/${challengeId}`);
    const data = await response.json();
    const challenge = data.data;

    return {
      title: challenge.title,
      description: challenge.description.slice(0, 100),
      openGraph: {
        title: `${challenge.title} | DevUp`,
        description: challenge.description.slice(0, 100),
      },
    };
  } catch (error) {
    return {
      title: "챌린지 상세",
    };
  }
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
