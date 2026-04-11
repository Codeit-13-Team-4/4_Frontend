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
export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";

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
