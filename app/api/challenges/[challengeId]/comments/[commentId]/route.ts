import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ challengeId: string; commentId: string }> },
) {
  try {
    const { challengeId, commentId } = await params;
    const accessToken = await getAuthToken();

    if (!accessToken) {
      return NextResponse.json(
        { message: "로그인되어 있지 않습니다." },
        { status: 401 },
      );
    }

    const body = await request.json();

    const response = await fetch(
      `${BASE_URL}/challenges/${Number(challengeId)}/comments/${Number(commentId)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ content: body.content }),
      },
    );

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { message: data.message || "댓글 수정에 실패했습니다." },
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

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ challengeId: string; commentId: string }> },
) {
  try {
    const { challengeId, commentId } = await params;
    const accessToken = await getAuthToken();

    if (!accessToken) {
      return NextResponse.json(
        { message: "로그인되어 있지 않습니다." },
        { status: 401 },
      );
    }

    const response = await fetch(
      `${BASE_URL}/challenges/${Number(challengeId)}/comments/${Number(commentId)}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { message: data.message || "댓글 삭제에 실패했습니다." },
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
