import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationsChallenges } from "../api/applicationsChallenges";

export function useApplyChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applicationsChallenges,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challengesList"] });
    },
  });
}
