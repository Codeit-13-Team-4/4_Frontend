import type {
  VerificationFrequencyType,
  VerificationMethodType,
} from "@/features/challenges/detail/model/challengesDetail";

export const VERIFICATION_FREQUENCY_LABEL: Record<
  VerificationFrequencyType,
  string
> = {
  ONCE_A_DAY: "매일 1회",
  EVERY_WEEKDAY: "평일 매일",
  ONCE_A_WEEK: "주 1회",
  THREE_TIMES_A_WEEK: "주 3회",
};

export const VERIFICATION_METHOD_LABEL: Record<VerificationMethodType, string> =
  {
    IMAGE_AND_TEXT: "이미지 + 텍스트",
    TEXT: "텍스트",
    IMAGE: "이미지",
  };
