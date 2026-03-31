import type { User } from "@/shared/types/user";

export interface Comment {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
  user: Pick<
    User,
    "id" | "nickname" | "jobLabel" | "profileImageUrl" | "skills"
  >;
}

export interface CommentsResponse {
  data: Comment[];
  total: number;
}
