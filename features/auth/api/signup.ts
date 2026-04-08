import { fetchClient } from "@/shared/lib/client/fetchClient";
import { ApiError } from "@/shared/lib/errors/ApiError";

interface SocialSignupRequest {
  type?: string;
  token?: string;
  email?: string;
  nickname: string;
}
interface SignupRequest extends SocialSignupRequest {
  //상속가능하게
  password: string;
}

interface SignupResponse {
  message: string;
  user: { id: number; email: string; nickname: string; createdAt: string };
}

export async function signup({
  //타입수정
  email,
  nickname,
  password,
}: SignupRequest): Promise<SignupResponse> {
  const response = await fetchClient("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email!.trim(),
      nickname: nickname.trim(),
      password: password.trim(),
    }),
  });
  return response.json();
}

export async function socialSignup({
  //회원가입용

  type,
  token,
  nickname,
}: SocialSignupRequest): Promise<SignupResponse> {
  try {
    const response = await fetchClient("/api/auth/socialsignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: type!.trim(),
        token: token?.trim(),
        nickname: nickname.trim(),
      }),
    });

    return response.json();
  } catch (error) {
    if (error instanceof ApiError && error.code === "social_account_exists") {
      throw new Error("SOCIAL_ACCOUNT_EXISTS");
    }

    throw error;
  }
}
