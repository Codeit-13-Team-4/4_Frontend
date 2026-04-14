"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import rejectChallengeApplication from "../api/rejectChallengeApplication";
import { mypageKeys } from "../model/mypage.queryKey";
import { ReasonCategoryType } from "../model/mypage.types";

type RejectVariables = {
  applicationId: number;
  reasonCategory: ReasonCategoryType;
  reasonDetail: string;
};

export const useRejectChallengeApplication = (challengeId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      reasonCategory,
      reasonDetail,
    }: RejectVariables) =>
      rejectChallengeApplication({
        applicationId,
        reasonCategory,
        reasonDetail,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: mypageKeys.challengeApplications(challengeId),
      });
    },
  });
};
