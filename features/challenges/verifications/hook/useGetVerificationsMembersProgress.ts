import { useQuery } from "@tanstack/react-query";
import { getVerificationsMembersProgress } from "../api/getVerificationsMembersProgress";
import { verificationsKeys } from "../model";

export function useGetVerificationsMembersProgress(challengeId: number) {
  return useQuery({
    queryKey: verificationsKeys.memberProgressList({ challengeId }),
    queryFn: () => getVerificationsMembersProgress(challengeId),
  });
}
