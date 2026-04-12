import type { ChallengesDetail } from "@/features/challenges/detail/model/challengesDetail";

export type JoinButtonKey =
  | "isHost"
  | "JOINED"
  | "PENDING"
  | "REJECTED"
  | "closed"
  | "INSTANT"
  | "APPROVAL";

export const JOIN_BUTTON_CONFIG: Record<
  JoinButtonKey,
  { label: string; disabled: boolean; variant: "primary" | "disabled" | "dark" }
> = {
  isHost: { label: "수정하기", disabled: false, variant: "primary" },
  JOINED: { label: "참여 중", disabled: true, variant: "disabled" },
  PENDING: { label: "승인 대기 중", disabled: true, variant: "disabled" },
  REJECTED: { label: "거절됨", disabled: true, variant: "disabled" },
  closed: { label: "모집 마감", disabled: true, variant: "disabled" },
  INSTANT: { label: "즉시 참여하기", disabled: false, variant: "primary" },
  APPROVAL: { label: "참여 신청하기", disabled: false, variant: "primary" },
};

export function getJoinButtonKey(challenge: ChallengesDetail): JoinButtonKey {
  if (challenge.isHost) return "isHost";
  if (challenge.myParticipationStatus !== "NONE")
    return challenge.myParticipationStatus;
  if (!challenge.isJoinable) return "closed";
  return challenge.joinType === "INSTANT" ? "INSTANT" : "APPROVAL";
}
