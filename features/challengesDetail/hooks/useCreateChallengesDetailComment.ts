import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChallengesDetailComment } from "@/features/challengesDetail/api/createChallengesDetailComment";

export function useCreateChallengesDetailComment(challengeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) =>
      createChallengesDetailComment({ challengeId, content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["challenges", "comments", challengeId],
      });
    },
  });
}
