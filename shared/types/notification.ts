export type NotificationType =
  | "applicationSent"
  | "applicationReceived"
  | "applicationReapplied"
  | "applicationAccepted"
  | "applicationRejected"
  | "unreadChat"
  | "proposalSent"
  | "proposalReceived"
  | "proposalReproposed"
  | "proposalAccepted"
  | "proposalRejected"
  | "registeredIssueCoupon"
  | "initialOrderIssueCoupon"
  | "openedIssueCoupon"
  | "other";

export type TargetType =
  | "chat"
  | "application"
  | "proposal"
  | "coupon"
  | "project"
  | "other";

export interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  content: string;
  targetInfo: {
    type: TargetType;
    id: number;
  };
  isRead: boolean;
  displayTime: string;
  createdAt: string;
}

export interface NotificationResponse {
  data: Notification[];
  total: number;
}
