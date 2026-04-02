export async function applyChallenge({
  challengeId,
  name,
  motivation,
}: {
  challengeId: number;
  name: string;
  motivation: string;
}): Promise<void> {
  const response = await fetch(`/api/challenges/${challengeId}/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, motivation }),
  });

  if (response.status === 409) {
    const data = await response.json();
    throw { status: 409, message: data.message };
  }

  if (!response.ok) {
    throw new Error("챌린지 참여 신청에 실패했습니다.");
  }
}
