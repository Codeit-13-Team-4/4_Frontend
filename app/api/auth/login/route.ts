import { NextRequest, NextResponse } from "next/server";
import { getAuthCookieOptions } from "@/shared/lib/server/authCookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message: data.message || "로그인에 실패했습니다.",
        },
        { status: response.status },
      );
    }

    const { user, accessToken, refreshToken, expiresIn } = data;
    const refreshTokenMaxAge =
      typeof expiresIn === "number" && Number.isFinite(expiresIn)
        ? Math.floor(expiresIn / 1000)
        : null;
    const responseToClient = NextResponse.json(
      {
        message: "로그인에 성공했습니다.",
        user,
      },
      { status: 200 },
    );

    responseToClient.cookies.set("accessToken", accessToken, {
      ...getAuthCookieOptions(),
    });

    responseToClient.cookies.set("refreshToken", refreshToken, {
      ...getAuthCookieOptions(refreshTokenMaxAge),
    });

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
