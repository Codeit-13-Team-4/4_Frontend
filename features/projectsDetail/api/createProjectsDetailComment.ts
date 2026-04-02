import type { Comment } from "@/features/projectsDetail/types/comment";

interface CreateCommentParams {
  projectId: number;
  content: string;
}

export async function createProjectsDetailComment({
  projectId,
  content,
}: CreateCommentParams): Promise<Comment> {
  const response = await fetch(`/api/projects/${projectId}/comments`, {
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
