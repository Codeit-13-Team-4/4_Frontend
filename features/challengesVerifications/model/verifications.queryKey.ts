import { VerificationsFilter } from "./verifications.type";

export const verificationsKeys = {
  all: ["verifications"] as const,
  lists: () => [...verificationsKeys.all, "list"] as const,
  list: (params: { challengeId: number; filters?: VerificationsFilter }) =>
    [...verificationsKeys.lists(), params] as const,

  details: () => [...verificationsKeys.all, "detail"] as const,
  detail: (params: { challengeId: number; verificationId: number }) =>
    [...verificationsKeys.details(), params] as const,
};
