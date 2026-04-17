import { useQuery } from "@tanstack/react-query";
import { getVerificationsDetail } from "../api/getVerificationsDetail";
import {
  VerificationsIdProps,
  verificationsKeys,
} from "@/features/challenges/verifications/model";

export function useGetVerificationsDetail({
  challengeId,
  verificationId,
}: VerificationsIdProps) {
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
