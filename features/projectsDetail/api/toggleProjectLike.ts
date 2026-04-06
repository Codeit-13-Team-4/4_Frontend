import { fetchClient } from "@/shared/lib/client/fetchClient";

export async function toggleProjectLike(
  projectId: number,
  liked: boolean,
): Promise<void> {
  await fetchClient(`/api/projects/${projectId}/liked`, {
    method: liked ? "DELETE" : "POST",
  });
}
