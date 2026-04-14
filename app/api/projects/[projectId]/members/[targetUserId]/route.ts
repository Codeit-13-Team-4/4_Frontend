import { NextRequest, NextResponse } from "next/server";
import { fetchWithAuthRetry } from "@/shared/lib/server/auth";
import { ApiError } from "@/shared/lib/errors/ApiError";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ projectId: string; targetUserId: string }> },
) {
  try {
    const { projectId, targetUserId } = await params;

    await fetchWithAuthRetry(
      `${BASE_URL}/projects/${Number(projectId)}/members/${Number(targetUserId)}`,
      { method: "DELETE" },
    );
    return new NextResponse(null, { status: 204 });
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
