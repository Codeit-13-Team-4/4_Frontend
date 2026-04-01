import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  try {
    const { projectId, position, motivation } = await req.json();

    const response = await fetch(
      `${BASE_URL}/projects/${projectId}/applications`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ position, motivation }),
      },
    );

    if (response.status === 409) {
      return NextResponse.json(
        { message: "이미 지원한 프로젝트입니다." },
        { status: 409 },
      );
    }

    if (!response.ok) {
      throw new Error(
        `사이드 프로젝트 지원을 실패했습니다. (${response.status})`,
      );
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "프로젝트 조회 중 서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
