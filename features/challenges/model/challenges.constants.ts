export const CHALLENGES_STATUS = {
  RECRUITING: { value: "recruiting" },
  RECRUITMENT_CLOSED: { value: "recruitment_closed" },
  IN_PROGRESS: { value: "in_progress" },
  COMPLETED: { value: "completed" },
} as const;

export const VERIFICATION_FREQUENCY_LABEL = {
  ONCE_A_DAY: "매일 1회",
  EVERY_WEEKDAY: "매주 평일",
  ONCE_A_WEEK: "주 1회",
  THREE_TIMES_A_WEEK: "주 3회",
} as const;

export const CHALLENGES_SORT_LABEL = {
  latest: "최신순",
  popular: "인기순",
  deadline: "마감 임박순",
  oldest: "오래된 순",
} as const;

export const VERIFICATION_METHOD_OPTIONS = [
  { value: "TEXT", label: "텍스트" },
  { value: "IMAGE", label: "이미지" },
  { value: "IMAGE_AND_TEXT", label: "이미지 + 텍스트" },
] as const;

export const JOIN_TYPE_OPTIONS = [
  {
    value: "INSTANT",
    title: "즉시 참여가능",
    description: "별도의 승인 절차 없이 신청 즉시 모임에 합류해요",
  },
  {
    value: "APPROVAL",
    title: "참여 신청 및 승인",
    description:
      "참여자의 지원 사유 내용을 확인하고 주최자가 직접 수락 여부를 결정해요",
  },
] as const;
