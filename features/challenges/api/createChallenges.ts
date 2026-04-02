import { ParticipationType, VerificationFrequencyType } from "../model";

interface CreateChallengesBody {
  title: string;
  description: string;
  tags: string[];
  startDate: string;
  endDate: string;
  recruitDeadline: string;
  verificationFrequency: VerificationFrequencyType;
  maxParticipants: number;
  joinType: ParticipationType;
  verificationMethod: "IMAGE_AND_TEXT" | "TEXT" | "IMAGE"; // 지워야 할 것 같음
}

export async function createChallengesProject(body: CreateChallengesBody) {
  const response = await fetch("/api/challenges/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`챌린지 생성을 실패했습니다. (${response.status})`);
  }

  const data = await response.json();

  return data;
}
