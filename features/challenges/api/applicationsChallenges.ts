type applyChallengesProps = {
  name: string;
  motivation: string;
  challengeId: number;
};

export async function applicationsChallenges({
  challengeId,
  name,
  motivation,
}: applyChallengesProps) {
  const response = await fetch(`/api/challenges/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ challengeId, name, motivation }),
  });

  if (response.status === 409) {
    const error = await response.json();

    throw { status: 409, message: error.message };
  }

  if (!response.ok) {
    throw new Error(`챌린지 지원을 실패했습니다. (${response.status})`);
  }

  return response.json();
}
