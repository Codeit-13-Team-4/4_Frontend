import { NextRequest, NextResponse } from "next/server";
import { fetchWithAuthRetry } from "@/shared/lib/server/auth";
import { ApiError } from "@/shared/lib/errors/ApiError";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function POST(req: NextRequest) {
  try {
    const { projectId, position, motivation } = await req.json();
    const data = await fetchWithAuthRetry(
      `${BASE_URL}/projects/${Number(projectId)}/applications`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ position, motivation }),
      },
    );
    return NextResponse.json(data, { status: 201 });
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
