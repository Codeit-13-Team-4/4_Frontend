import { NotificationType } from "@/shared/types/notification";

export interface NotificationsParamsType {
  start?: number;
  perPage?: number;
  type?: NotificationType;
  isRead?: boolean;
}
