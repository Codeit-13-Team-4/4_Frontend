"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import approveChallengeApplication from "../api/approveChallengeApplication";
import { mypageKeys } from "../model/mypage.queryKey";

export const useApproveChallengeApplication = (challengeId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (applicationId: number) =>
      approveChallengeApplication(applicationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: mypageKeys.challengeApplications(challengeId),
      });
    },
  });
};
