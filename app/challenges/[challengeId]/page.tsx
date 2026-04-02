export default async function ChallengesPage({
  params,
}: {
  params: Promise<{ challengeId: string }>;
}) {
  const { challengeId } = await params;
  const id = Number(challengeId);

  return <></>;
}
