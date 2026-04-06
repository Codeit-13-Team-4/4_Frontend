"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChallengesProject } from "../api/createChallenges";
import { ChallengeCardProps } from "../model";

export const useCreateChallenges = (
  onSuccess: (data: ChallengeCardProps) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChallengesProject,
    meta: { successMessage: "챌린지 생성에 성공했습니다." },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["challengesList"] });
      onSuccess(data.data);
    },
  });
};
