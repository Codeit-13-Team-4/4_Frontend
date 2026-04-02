import ChallengeDetailCard from "@/widgets/challengesDetail/ui/ChallengeDetailCard";
import CommentSection from "@/widgets/challengesDetail/ui/CommentSection";

export default async function ChallengesPage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const { challengeId } = await params;
  const id = Number(challengeId);

  return (
    <>
      <ChallengeDetailCard challengeId={id} />
      <CommentSection challengeId={id} />
    </>
  );
}
