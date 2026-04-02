export async function deleteChallengesDetail(
  challengeId: number,
): Promise<void> {
  const response = await fetch(`/api/challenges/${challengeId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "챌린지 삭제에 실패했습니다.");
  }
}
