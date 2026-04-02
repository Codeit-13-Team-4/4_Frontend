import type { User } from "@/shared/types/user";

export interface Comment {
  id: number;
  author: Pick<User, "id" | "nickname" | "profileImageUrl">;
  content: string;
  createdAt: string;
}

export interface CommentsResponse {
  data: Comment[];
  total: number;
}
