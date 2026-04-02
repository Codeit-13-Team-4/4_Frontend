export async function toggleChallengeLike(
  challengeId: number,
  liked: boolean,
): Promise<void> {
  const response = await fetch(`/api/challenges/${challengeId}/liked`, {
    method: liked ? "DELETE" : "POST",
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "찜하기에 실패했습니다.");
  }
}
