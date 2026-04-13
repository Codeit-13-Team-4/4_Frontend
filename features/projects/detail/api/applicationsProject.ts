import { fetchClient } from "@/shared/lib/client/fetchClient";
import { PositionType } from "@/features/projects/model";

type applyProjectProps = {
  projectId: string;
  position: PositionType;
  motivation: string;
};

export async function applicationsProject({
  projectId,
  position,
  motivation,
}: applyProjectProps) {
  const response = await fetchClient(`/api/projects/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ projectId, position, motivation }),
  });
  return response.json();
}
