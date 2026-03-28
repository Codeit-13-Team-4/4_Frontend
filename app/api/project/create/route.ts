import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const body = await request.json();

    const response = await fetch(`${BASE_URL}/projects`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title: "테스트 카드1",
        description: "2026.03.26 사이드 프로젝트 post api 테스트입니다.",
        projectType: "PORTFOLIO",
        techStacks: ["JavaScript"],
        positions: ["PM", "FE"],
        maxMembers: 2,
        recruitEndDate: "2026-03-30",
        projectStartDate: "2026-03-26",
        projectEndDate: "2026-05-01",
        contactMethod: "KAKAO_OPEN_CHAT",
        contactLink: "string",
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `사이드 프로젝트 생성을 실패했습니다. (${response.status})`,
      );
    }

    return NextResponse.json({ message: "테스트 성공" }, { status: 200 });
  } catch (error) {
    console.error("에러:", error);

    return NextResponse.json({ message: "서버 에러" }, { status: 500 });
  }
}
