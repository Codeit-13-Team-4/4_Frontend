import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ challengeId: string }> },
) {
  const { challengeId } = await params;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: "로그인되어 있지 않습니다." },
      { status: 401 },
    );
  }

  try {
    const body = await req.json();

    const response = await fetch(
      `${BASE_URL}/challenges/${challengeId}/applications`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      },
    );

    if (response.status === 409) {
      const data = await response.json();
      return NextResponse.json(
        { message: data.message || "이미 참여 신청한 챌린지입니다." },
        { status: 409 },
      );
    }

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { message: data.message || "챌린지 참여 신청에 실패했습니다." },
        { status: response.status },
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
