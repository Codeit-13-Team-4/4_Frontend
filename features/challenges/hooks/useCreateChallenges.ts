"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChallengesProject } from "../api/createChallenges";
import { ChallengeCardProps } from "../model";
import { challengeKeys } from "@/features/challenges/model/challenges.queryKey";

export const useCreateChallenges = (
  onSuccess: (data: ChallengeCardProps) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChallengesProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: challengeKeys.lists() });
      onSuccess(data.data);
    },
  });
};
