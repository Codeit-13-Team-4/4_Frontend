import { TechStackType } from "@/features/projects/model";
import { JobLabelType } from "@/shared/types/user";

export type VerificationsFilter = {
  status?: string;
  page?: number;
  limit?: number;
};

export type VerificationListUserData = {
  id: number;
  nickname: string;
  profileImageUrl: string;
};
export type VerificationStatus = "BEFORE" | "PENDING" | "APPROVED" | "REJECTED";

export type VerificationCardProps = {
  challengeId: number;
  verificationId: number;
  user: VerificationListUserData;
  createdAt: string;
  updatedAt: string;
  status: VerificationStatus;
  reviewedAt: string;
  rejectionReason: string;
};

export type UpdateVerificationStatusRequest =
  | { status: "APPROVED" }
  | { status: "REJECTED"; message: string };

export type VerificationDetailData = {
  verificationId: number;
  challengeId: number;
  user: VerificationDetailUserData;
  createdAt: string;
  updatedAt: string;
  status: VerificationStatus;
  title: string;
  content: string;
  imageUrls: string[];
  reviewer: VerificationReviewerData;
  rejectionReason: string;
};

export type VerificationMember = {
  id: number;
  userId: number;
  memberType: "HOST" | "MEMBER";
  position: string;
  joinedAt: string;
  user: MemberUser;
};

export type GetVerificationMembersResponse = {
  data: VerificationMember[];
  total: number;
};

export type VerificationsIdProps = {
  challengeId: number;
  verificationId: number;
};

export type VerificationsPayload = {
  content: string;
  imageUrls: string;
};

type MemberUser = {
  id: number;
  nickname: string;
  jobLabel: JobLabelType;
  profileImageUrl: string | null;
  skills: TechStackType[];
};

type VerificationDetailUserData = {
  id: number;
  nickname: string;
  profileImageUrl: string;
};

type VerificationReviewerData = {
  id: number;
  nickname: string;
  reviewedAt: string;
};
