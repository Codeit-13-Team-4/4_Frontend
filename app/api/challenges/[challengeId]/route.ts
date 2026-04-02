import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ challengeId: string }> },
) {
  try {
    const { challengeId } = await params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const response = await fetch(
      `${BASE_URL}/challenges/${Number(challengeId)}`,
      {
        method: "GET",
        headers: {
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "챌린지 조회에 실패했습니다." },
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ challengeId: string }> },
) {
  try {
    const { challengeId } = await params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: "로그인되어 있지 않습니다." },
        { status: 401 },
      );
    }

    const body = await request.json();

    const response = await fetch(
      `${BASE_URL}/challenges/${Number(challengeId)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok) {
      const data = await response.json();
      return NextResponse.json(
        { message: data.message || "챌린지 수정에 실패했습니다." },
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
  { params }: { params: Promise<{ challengeId: string }> },
) {
  try {
    const { challengeId } = await params;
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: "로그인되어 있지 않습니다." },
        { status: 401 },
      );
    }

    const response = await fetch(
      `${BASE_URL}/challenges/${Number(challengeId)}`,
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
        { message: data.message || "챌린지 삭제에 실패했습니다." },
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
