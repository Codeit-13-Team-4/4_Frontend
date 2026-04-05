import { NextRequest, NextResponse } from "next/server";
import { fetchWithAuthRetry } from "@/shared/lib/server/auth";
import { ApiError } from "@/shared/lib/errors/ApiError";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const params = new URLSearchParams({
      start: searchParams.get("start") ?? "0",
      perPage: searchParams.get("perPage") ?? "10",
    });

    const type = searchParams.get("type");
    const isRead = searchParams.get("isRead");

    if (type) params.set("type", type);
    if (isRead !== null) params.set("isRead", isRead);

    const data = await fetchWithAuthRetry(
      `${BASE_URL}/notifications?${params}`,
    );
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status },
      );
    }
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
