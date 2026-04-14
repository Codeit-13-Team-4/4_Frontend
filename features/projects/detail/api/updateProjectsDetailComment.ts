import { fetchClient } from "@/shared/lib/client/fetchClient";

interface UpdateCommentParams {
  projectId: number;
  commentId: number;
  content: string;
}

export async function updateProjectsDetailComment({
  projectId,
  commentId,
  content,
}: UpdateCommentParams): Promise<void> {
  await fetchClient(`/api/projects/${projectId}/comments/${commentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
}
