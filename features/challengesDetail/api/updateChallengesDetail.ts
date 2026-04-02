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
  const response = await fetch(`/api/challenges/${challengeId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "챌린지 수정에 실패했습니다.");
  }
}
