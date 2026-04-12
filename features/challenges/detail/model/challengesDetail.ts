import { User } from "@/shared/types/user";
import {
  ParticipationType,
  VerificationFrequencyType,
  MyParticipationStatus,
  ChallengesStatusType,
} from "@/features/challenges/model";

export type { VerificationFrequencyType, ChallengesStatusType };

export type VerificationMethodType = "IMAGE_AND_TEXT" | "TEXT" | "IMAGE";

export type JoinType = ParticipationType;

export type MyParticipationStatusType = MyParticipationStatus;

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
  isLiked: boolean;
  myParticipationStatus: MyParticipationStatusType;
  isJoinable: boolean;
  host: Pick<User, "id" | "nickname" | "profileImageUrl">;
  createdAt: string;
  updatedAt: string;
}

export interface ChallengesDetailResponse {
  data: ChallengesDetail[];
}
