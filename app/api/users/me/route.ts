import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: "로그인되어 있지 않습니다." },
        { status: 401 },
      );
    }
    const response = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "사용자 정보 조회에 실패했습니다." },
        { status: response.status },
      );
    }
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
