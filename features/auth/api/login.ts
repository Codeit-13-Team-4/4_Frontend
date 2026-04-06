import { fetchClient } from "@/shared/lib/client/fetchClient";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  user: {
    id: number;
    email: string;
    nickname: string;
  };
}

export async function login({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> {
  const response = await fetchClient("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.trim(),
      password: password.trim(),
    }),
  });
  return response.json();
}
