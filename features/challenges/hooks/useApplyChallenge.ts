import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applicationsChallenges } from "../api/applicationsChallenges";

export function useApplyChallenge() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: applicationsChallenges,
    meta: { successMessage: "챌린지 지원에 성공했습니다." },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["challengesList"] });
    },
  });
}
