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

    const { content, imageUrls } = body;

    await fetchWithAuthRetry(
      `${BASE_URL}/challenges/${challengeId}/verifications/${verificationId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "챌린지 인증 수정하기",
          content,
          imageUrls: imageUrls ?? [],
        }),
      },
    );

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status },
      );
    }
  }
}

export async function GET(
  _request: NextRequest,
  {
    params,
  }: { params: Promise<{ challengeId: string; verificationId: string }> },
) {
  try {
    const { challengeId, verificationId } = await params;
    const data = await fetchWithAuthRetry(
      `${BASE_URL}/challenges/${challengeId}/verifications/${verificationId}`,
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

export async function DELETE(
  _request: NextRequest,
  {
    params,
  }: { params: Promise<{ challengeId: string; verificationId: string }> },
) {
  try {
    const { challengeId, verificationId } = await params;

    const data = await fetchWithAuthRetry(
      `${BASE_URL}/challenges/${challengeId}/verifications/${verificationId}`,
      {
        method: "DELETE",
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
