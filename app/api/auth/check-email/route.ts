import { getSignupErrorMessage } from "@/features/auth/signup/lib/signupError";
import { ApiError } from "@/shared/lib/errors/ApiError";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get("email")?.trim();

    if (!email) {
      return NextResponse.json(
        {
          message: "이메일을 입력해주세요.",
        },
        { status: 400 },
      );
    }

    const params = new URLSearchParams({ email });
    const response = await fetch(`${BASE_URL}/auth/check-email?${params}`, {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message = getSignupErrorMessage(response.status, data?.message, {
        fallbackMessage: "이메일 중복 확인에 실패했습니다.",
      });

      return NextResponse.json({ message }, { status: response.status });
    }

    return NextResponse.json(
      {
        available: data?.available ?? true,
        message: data?.message || "사용 가능한 이메일입니다.",
      },
      { status: response.status },
    );
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }
    return NextResponse.json(
      {
        message: "서버 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
