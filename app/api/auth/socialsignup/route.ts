import { NextRequest, NextResponse } from "next/server";
import { getSignupErrorMessage } from "@/features/auth/signup/lib/signupError";
import {
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
} from "@/shared/lib/server/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(`${BASE_URL}/auth/social/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: body.type,
        token: body.token,
        email: body.email,
        nickname: body.nickname,
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
    const accessToken =
      typeof data.accessToken === "string" ? data.accessToken : null;
    const refreshToken =
      typeof data.refreshToken === "string" ? data.refreshToken : null;
    const expiresIn =
      typeof data.expiresIn === "number" ? data.expiresIn : null;
    const refreshTokenMaxAge =
      typeof expiresIn === "number"
        ? Math.floor(expiresIn / 1000)
        : REFRESH_TOKEN_MAX_AGE;

    if (!accessToken) {
      return NextResponse.json(
        {
          message: "회원가입 응답 형식이 올바르지 않습니다.",
        },
        { status: 502 },
      );
    }

    const responseToClient = NextResponse.json(
      {
        message: "회원가입에 성공했습니다.",
        user: {
          id: data.id,
          email: data.email,
          nickname: data.nickname,
        },
      },
      { status: response.status },
    );
    responseToClient.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    if (refreshToken) {
      responseToClient.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: refreshTokenMaxAge,
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
