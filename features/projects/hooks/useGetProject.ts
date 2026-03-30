"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjectList } from "../api/getProjectList";
import { ProjectFilter } from "@/features/projects/model";

export const useGetProjectList = (filters: ProjectFilter = {}) => {
  return useQuery({
    queryKey: ["projectList", filters],
    queryFn: () => getProjectList(filters),
  });
};
