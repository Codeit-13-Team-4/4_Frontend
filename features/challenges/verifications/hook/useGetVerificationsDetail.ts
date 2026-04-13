import { useQuery } from "@tanstack/react-query";
import { verificationsKeys } from "../model/verifications.queryKey";
import { getVerificationsDetail } from "../api/getVerificationsDetail";

interface UseGetVerificationsDetailParams {
  challengeId: number;
  verificationId: number;
}

export function useGetVerificationsDetail({
  challengeId,
  verificationId,
}: UseGetVerificationsDetailParams) {
  return useQuery({
    queryKey: verificationsKeys.detail({
      challengeId,
      verificationId,
    }),
    queryFn: () =>
      getVerificationsDetail({
        challengeId,
        verificationId,
      }),
    enabled: !!challengeId && !!verificationId,
    throwOnError: true,
  });
}
