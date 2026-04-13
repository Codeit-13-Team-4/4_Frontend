import { useQuery } from "@tanstack/react-query";
import { getProjectDetail } from "../api/getProjectsDetail";
import { projectKeys } from "@/features/projects/model";

export function useProjectsDetail(id: number) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => getProjectDetail(id),
    staleTime: 1000 * 60 * 5,
    throwOnError: true,
  });
}
