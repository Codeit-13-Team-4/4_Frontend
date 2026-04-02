import { User } from "@/shared/types/user";

export type ChallengesStatusType =
  | "RECRUITING"
  | "RECRUITMENT_CLOSED"
  | "IN_PROGRESS"
  | "COMPLETED ";

export type VerificationMethodType = "IMAGE_AND_TEXT" | "TEXT" | "IMAGE";

export type JoinType = "INSTANT" | "APPROVAL";

export type VerificationFrequencyType =
  | "ONCE_A_DAY"
  | "EVERY_WEEKDAY"
  | "ONCE_A_WEEK"
  | "THREE_TIMES_A_WEEK"
  | "USER_INPUT";

export type MyParticipationStatusType =
  | "NONE"
  | "PENDING"
  | "JOINED"
  | "REJECTED";

export interface ChallengesDetail {
  id: number;
  title: string;
  description: string;
  tags: string[];
  status: ChallengesStatusType;
  verificationMethod: VerificationMethodType;
  joinType: JoinType;
  recruitDeadline: string;
  daysLeft: number;
  startDate: string;
  endDate: string;
  verificationFrequency: VerificationFrequencyType;
  participantCount: number;
  maxParticipants: number;
  progressRate: number;
  viewCount: number;
  commentCount: number;
  isBookmarked: boolean;
  isHost: boolean;
  isMember: boolean;
  myParticipationStatus: MyParticipationStatusType;
  isJoinable: boolean;
  host: Pick<User, "id" | "nickname">;
  createdAt: string;
  updatedAt: string;
}

export interface ChallengesDetailResponse {
  data: ChallengesDetail[];
}
