import { fetchClient } from "@/shared/lib/client/fetchClient";

interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

interface SignupResponse {
  message: string;
  user: { id: number; email: string; nickname: string; createdAt: string };
}

export async function signup({
  email,
  nickname,
  password,
}: SignupRequest): Promise<SignupResponse> {
  const response = await fetchClient("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.trim(),
      nickname: nickname.trim(),
      password: password.trim(),
    }),
  });
  return response.json();
}
