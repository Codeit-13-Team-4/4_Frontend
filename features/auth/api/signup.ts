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
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email!.trim(),
      nickname: nickname.trim(),
      password: password.trim(),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "회원가입에 실패했습니다.");
  }

  return data;
}

export async function socialSignup({
  //회원가입용
  type,
  token,
  nickname,
}: SocialSignupRequest): Promise<SignupResponse> {
  console.log(type, "\n", token, "\n", nickname);
  const response = await fetch("/api/auth/socialsignup", {
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

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "회원가입에 실패했습니다.");
  }

  return data;
}
