import { fetchClient } from "@/shared/lib/client/fetchClient";
import type { Comment } from "@/features/projectsDetail/types/comment";

interface CreateCommentParams {
  projectId: number;
  content: string;
}

export async function createProjectsDetailComment({
  projectId,
  content,
}: CreateCommentParams): Promise<Comment> {
  const response = await fetchClient(`/api/projects/${projectId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  return response.json();
}
