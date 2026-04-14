import { fetchClient } from "@/shared/lib/client/fetchClient";

export async function deleteProjectMember({
  projectId,
  targetUserId,
}: {
  projectId: number;
  targetUserId: number;
}) {
  await fetchClient(`/api/projects/${projectId}/members/${targetUserId}`, {
    method: "DELETE",
  });
}
