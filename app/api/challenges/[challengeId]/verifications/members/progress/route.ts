import { fetchWithAuthRetry } from "@/shared/lib/server/auth";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ challengeId: string }> },
) {
  try {
    const { challengeId } = await params;

    const data = await fetchWithAuthRetry(
      `${BASE_URL}/challenges/${challengeId}/verifications/members/progress`,
    );
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
