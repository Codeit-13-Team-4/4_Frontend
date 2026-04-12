import { CHALLENGES_SORT_LABEL } from "./challenges.constants";

export interface GetChallengesResDtoHost {
  id: number;
  nickname: string;
}

export type ChallengesFilterOptions = { value: string; label: string };
export type ParticipationType = "INSTANT" | "APPROVAL";
export type ChallengesStatusType =
  | "RECRUITING"
  | "RECRUITMENT_CLOSED"
  | "IN_PROGRESS"
  | "COMPLETED";
export type VerificationFrequencyType =
  | "ONCE_A_DAY"
  | "EVERY_WEEKDAY"
  | "ONCE_A_WEEK"
  | "THREE_TIMES_A_WEEK";

export type MyParticipationStatus = "NONE" | "PENDING" | "JOINED" | "REJECTED";

export interface ChallengeCardProps {
  id: number;
  title: string;
  host: GetChallengesResDtoHost;
  status: ChallengesStatusType;
  participationType: ParticipationType;
  tags: string[];
  verificationFrequency: VerificationFrequencyType;
  startDate: string;
  endDate: string;
  recruitDeadline: string;
  daysLeft: number;
  participantCount: number;
  maxParticipants: number;
  progressRate: number;
  viewCount: number;
  commentCount: number;
  isBookmarked: boolean;
  isJoinable: boolean;
  joinButtonLabel: string;
  isMember: boolean;
  isHost: boolean;
  isLiked: boolean;
  myParticipationStatus: MyParticipationStatus;
}

export type ChallengesSortType = keyof typeof CHALLENGES_SORT_LABEL;

export type ChallengesFilter = {
  keyword?: string;
  status?: string;
  sort?: string;
  participationType?: ParticipationType;
  page?: number;
  limit?: number;
};

export interface ChallengesAlertModalProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  id?: number;
}

export interface ChallengesPagination {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNext: boolean;
}

export interface ChallengesResponse {
  data: ChallengeCardProps[];
  pagination: ChallengesPagination;
}
