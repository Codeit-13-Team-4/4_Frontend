"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import rejectProjectApplication from "../api/rejectProjectApplication";
import { mypageKeys } from "../model/mypage.queryKey";
import { ApplicationRejectionType } from "../model/mypage.types";

type RejectVariables = {
  applicationId: number;
  rejectionType: ApplicationRejectionType;
  rejectionText: string;
};

export const useRejectProjectApplication = (projectId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      rejectionType,
      rejectionText,
    }: RejectVariables) =>
      rejectProjectApplication({ applicationId, rejectionType, rejectionText }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: mypageKeys.projectApplications(projectId),
      });
    },
  });
};
