import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: "로그인되어 있지 않습니다." },
        { status: 401 },
      );
    }

    const { searchParams } = request.nextUrl;
    const params = new URLSearchParams({
      start: searchParams.get("start") ?? "0",
      perPage: searchParams.get("perPage") ?? "10",
    });

    const type = searchParams.get("type");
    const isRead = searchParams.get("isRead");

    if (type) params.set("type", type);
    if (isRead !== null) params.set("isRead", isRead);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications?${params}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { message: data.message || "알림 조회에 실패했습니다." },
        { status: response.status },
      );
    }

    return NextResponse.json(await response.json());
  } catch {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
