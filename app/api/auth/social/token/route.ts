import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${BASE_URL}/auth/social/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: body.type,
        socialToken: body.socialToken,
      }),
      cache: "no-store",
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        {
          message: data.message || "토큰 발급 중 에러가 발생했습니다.",
          code: data.code || null,
        },
        { status: response.status },
      );
    }

    return NextResponse.json(
      {
        user: {
          id: data.id,
          email: data.email,
        },
        token: data.token,
      },
      { status: response.status },
    );
  } catch {
    return NextResponse.json(
      {
        message: "서버 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
