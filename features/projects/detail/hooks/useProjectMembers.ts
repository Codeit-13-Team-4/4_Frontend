import { useQuery } from "@tanstack/react-query";
import { getProjectMembers } from "../api/getProjectMembers";
import { projectKeys } from "@/features/projects/model";

export function useProjectMembers(
  projectId: number,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: projectKeys.members(projectId),
    queryFn: () => getProjectMembers({ projectId }),
    ...options,
  });
}
