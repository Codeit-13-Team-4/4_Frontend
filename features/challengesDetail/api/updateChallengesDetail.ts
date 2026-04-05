import { fetchClient } from "@/shared/lib/client/fetchClient";
import type {
  VerificationMethodType,
  JoinType,
  VerificationFrequencyType,
} from "@/features/challengesDetail/types/challengesDetail";

export interface UpdateChallengesDetailParams {
  challengeId: number;
  title?: string;
  description?: string;
  tags?: string[];
  verificationMethod?: VerificationMethodType;
  joinType?: JoinType;
  recruitDeadline?: string;
  startDate?: string;
  endDate?: string;
  verificationFrequency?: VerificationFrequencyType;
  maxParticipants?: number;
}

export async function updateChallengesDetail({
  challengeId,
  ...body
}: UpdateChallengesDetailParams): Promise<void> {
  await fetchClient(`/api/challenges/${challengeId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}
