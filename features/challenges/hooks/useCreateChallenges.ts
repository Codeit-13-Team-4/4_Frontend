"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChallengesProject } from "../api/createChallenges";

export const useCreateChallenges = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createChallengesProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challengesList"] });
      onSuccess();
    },
  });
};
