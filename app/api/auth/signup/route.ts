import { NextRequest, NextResponse } from "next/server";
import { getSignupErrorMessage } from "@/features/auth/signup/lib/signupError";
import { getAuthCookieOptions } from "@/shared/lib/server/authCookie";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body.email,
        nickname: body.nickname,
        password: body.password,
        position: body.jobLabel,
      }),
      cache: "no-store",
    });
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message = getSignupErrorMessage(response.status, data?.message, {
        fallbackMessage: "회원가입에 실패했습니다.",
      });

      return NextResponse.json({ message }, { status: response.status });
    }
    const responseToClient = NextResponse.json(
      {
        message: "회원가입에 성공했습니다.",
        user: {
          id: data?.user?.id ?? data?.id,
          email: data?.user?.email ?? data?.email,
          nickname: data?.user?.nickname ?? data?.nickname,
          createdAt: data?.user?.createdAt ?? data?.createdAt,
        },
      },
      { status: response.status },
    );
    const accessToken =
      typeof data?.accessToken === "string" ? data.accessToken : null;
    const refreshToken =
      typeof data?.refreshToken === "string" ? data.refreshToken : null;
    const expiresIn =
      typeof data?.expiresIn === "number" ? data.expiresIn : null;

    if (accessToken) {
      responseToClient.cookies.set("accessToken", accessToken, {
        ...getAuthCookieOptions(expiresIn),
      });
    }

    if (refreshToken) {
      responseToClient.cookies.set("refreshToken", refreshToken, {
        ...getAuthCookieOptions(),
      });
    }

    return responseToClient;
  } catch {
    return NextResponse.json(
      {
        message: "서버 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
