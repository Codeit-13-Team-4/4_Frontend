interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

interface SignupResponse {
  message: string;
  user: { id: number; email: string; nickname: string; createdAt: string };
}

export async function signup({
  email,
  nickname,
  password,
  passwordConfirm,
}: SignupRequest): Promise<SignupResponse> {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.trim(),
      nickname: nickname.trim(),
      password: password.trim(),
      passwordConfirm: passwordConfirm.trim(),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "회원가입에 실패했습니다.");
  }

  return data;
}
