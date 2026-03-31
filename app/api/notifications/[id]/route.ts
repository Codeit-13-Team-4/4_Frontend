import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: "로그인되어 있지 않습니다." },
        { status: 401 },
      );
    }

    const { id } = await params;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/notifications/${id}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        {
          message: data.message || "알림 읽음 처리에 실패했습니다.",
          code: data.code || null,
        },
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
