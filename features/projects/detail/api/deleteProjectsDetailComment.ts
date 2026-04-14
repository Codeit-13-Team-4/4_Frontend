import { fetchClient } from "@/shared/lib/client/fetchClient";

interface DeleteCommentParams {
  projectId: number;
  commentId: number;
}

export async function deleteProjectsDetailComment({
  projectId,
  commentId,
}: DeleteCommentParams): Promise<void> {
  await fetchClient(`/api/projects/${projectId}/comments/${commentId}`, {
    method: "DELETE",
  });
}
