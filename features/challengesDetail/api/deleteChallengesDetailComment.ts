import { fetchClient } from "@/shared/lib/client/fetchClient";

interface DeleteCommentParams {
  challengeId: number;
  commentId: number;
}

export async function deleteChallengesDetailComment({
  challengeId,
  commentId,
}: DeleteCommentParams): Promise<void> {
  await fetchClient(`/api/challenges/${challengeId}/comments/${commentId}`, {
    method: "DELETE",
  });
}
