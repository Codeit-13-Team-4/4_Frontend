import { NextRequest, NextResponse } from "next/server";
import { getAuthCookieOptions } from "@/shared/lib/server/authCookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const SOCIAL_LOGIN_PATH = "/auth/social";

function parseJsonSafely(text: string) {
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!BASE_URL) {
      return NextResponse.json(
        {
          message: "API 서버 주소가 설정되지 않았습니다.",
        },
        { status: 500 },
      );
    }

    const body = await request.json();
    const response = await fetch(`${BASE_URL}${SOCIAL_LOGIN_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: body.token,
        type: body.type,
        remember: true,
      }),
      cache: "no-store",
    });
    const raw = await response.text();
    const data = parseJsonSafely(raw);

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            (typeof data?.message === "string" && data.message) ||
            raw ||
            "로그인에 실패했습니다.",
        },
        { status: response.status },
      );
    }
    const accessToken =
      typeof data?.accessToken === "string" ? data.accessToken : null;
    const refreshToken =
      typeof data?.refreshToken === "string" ? data.refreshToken : null;
    const expiresIn =
      typeof data?.expiresIn === "number" ? data.expiresIn : null;
    const refreshTokenMaxAge =
      typeof expiresIn === "number" && Number.isFinite(expiresIn)
        ? Math.floor(expiresIn / 1000)
        : null;
    const user = data?.user;

    if (!accessToken) {
      return NextResponse.json(
        {
          message: "로그인 응답 형식이 올바르지 않습니다.",
        },
        { status: 502 },
      );
    }
    const responseToClient = NextResponse.json(
      {
        message:
          (typeof data?.message === "string" && data.message) ||
          "로그인에 성공했습니다.",
        user,
      },
      { status: 200 },
    );

    responseToClient.cookies.set("accessToken", accessToken, {
      ...getAuthCookieOptions(),
    });

    if (refreshToken) {
      responseToClient.cookies.set("refreshToken", refreshToken, {
        ...getAuthCookieOptions(refreshTokenMaxAge),
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
