import { fetchClient } from "@/shared/lib/client/fetchClient";
import type { Comment } from "@/features/challengesDetail/types/comment";

interface CreateCommentParams {
  challengeId: number;
  content: string;
}

export async function createChallengesDetailComment({
  challengeId,
  content,
}: CreateCommentParams): Promise<Comment> {
  const response = await fetchClient(
    `/api/challenges/${challengeId}/comments`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    },
  );
  return response.json();
}
