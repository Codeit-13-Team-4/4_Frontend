import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const { challengeId, name, motivation } = await req.json();

    const response = await fetch(
      `${BASE_URL}/challenges/${challengeId}/applications`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          name,
          motivation,
          githubUrl: "https://github.com/username", // 수정
        }),
      },
    );

    if (response.status === 409) {
      return NextResponse.json(
        { message: "이미 지원한 챌린지입니다." },
        { status: 409 },
      );
    }

    if (!response.ok) {
      throw new Error(`챌린지 지원을 실패했습니다. (${response.status})`);
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "챌린지 지원 중 서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
