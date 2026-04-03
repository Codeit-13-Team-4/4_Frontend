import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 생각 (컨벤션에 따라 틀렸을 수도 있음)
// route.ts 파일: Next.js에서 백엔드 API 주소를 만들어주는 역할
// Route handler 의 특징: 서버에서 얘를 요청할 수 없다.
// 그래서 route handler에서 토큰 에러 발생 시 여기다 요청하는 것을 권장하지 않는다.

export async function POST(request: NextRequest) {
  if (!BASE_URL) {
    return NextResponse.json(
      { message: "NEXT_PUBLIC_API_BASE_URL이 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => null);
  const cookieStore = await cookies();

  const refreshToken =
    body?.refreshToken || cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "refreshToken이 없습니다." },
      { status: 400 },
    );
  }

  const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({ refreshToken }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    return NextResponse.json(
      { message: data?.message ?? "토큰 재발급에 실패했습니다." },
      { status: response.status },
    );
  }

  if (data?.refreshToken) {
    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  if (data?.accessToken) {
    cookieStore.set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  return NextResponse.json(
    {
      user: data?.user ?? null,
      refreshed: true,
    },
    { status: 200 },
  );
}
