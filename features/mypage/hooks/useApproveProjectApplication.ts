"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import approveProjectApplication from "../api/approveProjectApplication";
import { mypageKeys } from "../model/mypage.queryKey";

export const useApproveProjectApplication = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (applicationId: number) =>
      approveProjectApplication(applicationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: mypageKeys.projectApplications(projectId),
      });
    },
  });
};
