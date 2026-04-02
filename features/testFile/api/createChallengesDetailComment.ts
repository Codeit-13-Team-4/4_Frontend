import type { Comment } from "@/features/challengesDetail/types/comment";

interface CreateCommentParams {
  challengeId: number;
  content: string;
}

export async function createChallengesDetailComment({
  challengeId,
  content,
}: CreateCommentParams): Promise<Comment> {
  const response = await fetch(`/api/challenges/${challengeId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "댓글 작성에 실패했습니다.");
  }

  return data;
}
