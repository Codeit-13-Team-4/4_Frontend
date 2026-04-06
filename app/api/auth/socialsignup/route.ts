import { NextRequest, NextResponse } from "next/server";

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
        nickname: body.nickname,
      }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: data.message || "회원가입에 실패했습니다.",
          code: data.code || null,
        },
        { status: response.status },
      );
    }

    const accessToken =
      typeof data.accessToken === "string" ? data.accessToken : null;
    const refreshToken =
      typeof data.refreshToken === "string" ? data.refreshToken : null;

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
    });

    if (refreshToken) {
      responseToClient.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
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
