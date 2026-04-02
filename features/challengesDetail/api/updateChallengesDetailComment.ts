interface UpdateCommentParams {
  challengeId: number;
  commentId: number;
  content: string;
}

export async function updateChallengesDetailComment({
  challengeId,
  commentId,
  content,
}: UpdateCommentParams): Promise<void> {
  const response = await fetch(
    `/api/challenges/${challengeId}/comments/${commentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    },
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "댓글 수정에 실패했습니다.");
  }
}
