interface DeleteCommentParams {
  challengeId: number;
  commentId: number;
}

export async function deleteChallengesDetailComment({
  challengeId,
  commentId,
}: DeleteCommentParams): Promise<void> {
  const response = await fetch(
    `/api/challenges/${challengeId}/comments/${commentId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "댓글 삭제에 실패했습니다.");
  }
}
