import { fetchWithAuthRetry } from "@/shared/lib/server/auth";
import { User } from "@/shared/types/user";

export async function getMeServer(): Promise<User | null> {
  try {
    return await fetchWithAuthRetry<User>(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`,
    );
  } catch {
    return null;
  }
}
