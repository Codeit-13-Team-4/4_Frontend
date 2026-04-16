import { ApiError } from "@/shared/lib/errors/ApiError";
import { fetchWithAuthRetry } from "@/shared/lib/server/auth";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function PATCH(
  request: NextRequest,
  {
    params,
  }: { params: Promise<{ challengeId: string; verificationId: string }> },
) {
  try {
    const { challengeId, verificationId } = await params;
    const body = await request.json();
    const data = await fetchWithAuthRetry(
      `${BASE_URL}/challenges/${challengeId}/verifications/${verificationId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status },
      );
    }
  }
}
