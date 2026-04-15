"use client";

import { useQuery } from "@tanstack/react-query";
import getProjectApplications from "../api/getProjectApplications";
import { mypageKeys } from "../model/mypage.queryKey";

export const useProjectApplications = (projectId: number, enabled: boolean) => {
  return useQuery({
    queryKey: mypageKeys.projectApplications(projectId),
    queryFn: () => getProjectApplications({ projectId }),
    enabled,
  });
};
