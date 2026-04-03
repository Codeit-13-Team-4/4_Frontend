import { User } from "@/shared/types/user";
import { cookies } from "next/headers";

export async function getMeServer(): Promise<User | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const data = await response.json().catch(() => null);

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error(data?.message || "사용자 정보 조회에 실패했습니다.");
  }

  return data as User;
}
