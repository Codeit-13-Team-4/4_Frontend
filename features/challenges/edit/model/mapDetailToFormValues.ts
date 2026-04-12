import type { ChallengesDetail } from "@/features/challenges/detail/model/challengesDetail";
import type { ChallengesCreateFormValues } from "@/features/challenges/create/model/challenges.schema";

export function mapDetailToFormValues(
  detail: ChallengesDetail,
): ChallengesCreateFormValues {
  return {
    title: detail.title,
    content: detail.description,
    tags: detail.tags,
    recruitDeadline: new Date(detail.recruitDeadline),
    challengeStart: new Date(detail.startDate),
    challengeEnd: new Date(detail.endDate),
    verificationFrequency: detail.verificationFrequency,
    verificationMethod: detail.verificationMethod,
    maxParticipants: detail.maxParticipants,
    joinType: detail.joinType,
  };
}
