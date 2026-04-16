import { fetchWithAuthRetry } from "@/shared/lib/server/auth";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ challengeId: string }> },
) {
  try {
    const { challengeId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();

    const data = await fetchWithAuthRetry(
      `${BASE_URL}/challenges/${challengeId}/verifications${queryString ? `?${queryString}` : ""}`,
    );
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ challengeId: string }> },
) {
  try {
    const { challengeId } = await params;

    const body = await request.json();

    const { content, imageUrls } = body;

    const data = await fetchWithAuthRetry(
      `${BASE_URL}/challenges/${challengeId}/verifications`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "챌린지 인증하기",
          content,
          imageUrls: imageUrls ?? [],
        }),
      },
    );

    return Response.json(data);
  } catch {
    return Response.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
