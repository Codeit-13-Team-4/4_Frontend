import { useQuery } from "@tanstack/react-query";
import { verificationsKeys } from "../model";
import { getVerificationsMembers } from "../api/getVerificationsMembers";

export function useGetVerificationsMember(challengeId: number) {
  return useQuery({
    queryKey: verificationsKeys.memberList({ challengeId }),
    queryFn: () => getVerificationsMembers(challengeId),
  });
}
