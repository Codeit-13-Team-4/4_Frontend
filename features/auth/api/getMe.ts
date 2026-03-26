export interface User {
  id: number;
  email: string;
  nickname: string;
}

export async function getMe(): Promise<User> {
  const response = await fetch("/api/users/me", {
    method: "GET",
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "사용자 정보 조회에 실패했습니다.");
  }

  return data;
}
