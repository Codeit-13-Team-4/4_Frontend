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
  USER_INPUT: "직접 입력",
} as const;

export const CHALLENGES_SORT_LABEL = {
  latest: "최신순",
  popular: "인기순",
  deadline: "마감 임박순",
  oldest: "오래된 순",
};
