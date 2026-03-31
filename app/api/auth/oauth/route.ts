import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get("type");
    const redirectUri = request.nextUrl.searchParams.get("redirectUri");
    const response = await fetch(
      `${BASE_URL}/auth/oauth2?type=${type}&redirectUri=${redirectUri}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );
    return NextResponse.json({
      url: response.url,
    });
  } catch {
    return NextResponse.json(
      {
        message: "서버 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}
