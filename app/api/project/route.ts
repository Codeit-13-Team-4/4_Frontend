import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}/projects?start=0&perPage=10`);
    if (!response.ok) {
      throw new Error(
        `사이드 프로젝트 목록을 불러오는데 실패했습니다. (${response.status})`,
      );
    }
    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "프로젝트 조회 중 서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
