import { useQuery } from "@tanstack/react-query";
import { getProjectDetail } from "../api/getProjectsDetail";

export function useProjectsDetail(id: number) {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProjectDetail(id),
    staleTime: 1000 * 60 * 5,
  });
}
