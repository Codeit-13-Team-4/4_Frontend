import { useQuery } from "@tanstack/react-query";
import { verificationsKeys } from "../model";
import { getVerificationsMemberPermissions } from "../api/getVerificationsMemberPermissions";

export function useGetVerificationsMemberPermissions(challengeId: number) {
  return useQuery({
    queryKey: verificationsKeys.me({ challengeId }),
    queryFn: () => getVerificationsMemberPermissions(challengeId),
  });
}
