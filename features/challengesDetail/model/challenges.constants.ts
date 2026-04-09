import type {
  ChallengesStatusType,
  VerificationFrequencyType,
  VerificationMethodType,
  JoinType,
} from "@/features/challengesDetail/types/challengesDetail";
import { Lightning, Lock } from "@/shared/icons";
import type { ComponentType, SVGProps } from "react";

// 챌린지 상세: 진행중·완료는 모집이 끝난 상태이므로 모집완료로 표시
export const CHALLENGE_STATUS_LABEL: Record<
  ChallengesStatusType,
  { label: string; variant: "recruit" | "closed" }
> = {
  RECRUITING: { label: "모집중", variant: "recruit" },
  RECRUITMENT_CLOSED: { label: "모집완료", variant: "closed" },
  IN_PROGRESS: { label: "모집완료", variant: "closed" },
  COMPLETED: { label: "모집완료", variant: "closed" },
};

export const VERIFICATION_FREQUENCY_LABEL: Record<
  VerificationFrequencyType,
  string
> = {
  ONCE_A_DAY: "매일 1회",
  EVERY_WEEKDAY: "평일 매일",
  ONCE_A_WEEK: "주 1회",
  THREE_TIMES_A_WEEK: "주 3회",
  USER_INPUT: "직접 입력",
};

export const VERIFICATION_METHOD_LABEL: Record<VerificationMethodType, string> =
  {
    IMAGE_AND_TEXT: "이미지 + 텍스트",
    TEXT: "텍스트",
    IMAGE: "이미지",
  };

export const JOIN_TYPE_LABEL: Record<
  JoinType,
  {
    label: string;
    variant: "auto" | "approve";
    icon: ComponentType<SVGProps<SVGSVGElement>>;
  }
> = {
  INSTANT: {
    label: "즉시 참여 가능",
    variant: "auto",
    icon: Lightning,
  },
  APPROVAL: {
    label: "승인 후 참여 가능",
    variant: "approve",
    icon: Lock,
  },
};
