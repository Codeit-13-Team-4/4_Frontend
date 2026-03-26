import { NextRequest, NextResponse } from "next/server";

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

    return NextResponse.json(
      {
        message: "회원가입에 성공했습니다.",
        user: {
          id: data.id,
          email: data.email,
          nickname: data.nickname,
          createdAt: data.createdAt,
        },
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
