import { NextResponse } from "next/server";
import { fetchWithAuthRetry } from "@/shared/lib/server/auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  try {
    const result = await fetchWithAuthRetry(`${BASE_URL}/users/me`, {
      method: "GET",
    });

    if (!result.data) {
      return NextResponse.json(
        { message: result.error ?? "사용자 정보 조회에 실패했습니다." },
        { status: result.status },
      );
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
