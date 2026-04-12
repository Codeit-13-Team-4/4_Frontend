import { fetchClient } from "@/shared/lib/client/fetchClient";

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
  await fetchClient(`/api/challenges/${challengeId}/comments/${commentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
}
