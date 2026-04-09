import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/shared/lib/errors/ApiError";
import { getLikedChallengeListServer } from "@/features/liked/api/getLikedChallengeList.server";
import type { LikedChallengeFilter } from "@/features/liked/model";
import type { ParticipationType } from "@/features/challenges/model";

const DEFAULT_START = 0;
const DEFAULT_PER_PAGE = 10;

function parseNumber(value: string | null, fallback: number) {
  const parsed = Number(value);

  if (Number.isNaN(parsed) || parsed < 0) {
    return fallback;
  }

  return parsed;
}

function parseParticipationType(
  value: string | null,
): ParticipationType | undefined {
  if (value === "INSTANT" || value === "APPROVAL") {
    return value;
  }

  return undefined;
}

function parseLikedSort(value: string | null): LikedChallengeFilter["sort"] {
  if (
    value === "latest" ||
    value === "popular" ||
    value === "deadline" ||
    value === "oldest"
  ) {
    return value;
  }

  return undefined;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters: LikedChallengeFilter = {
      start: parseNumber(searchParams.get("start"), DEFAULT_START),
      perPage: parseNumber(searchParams.get("perPage"), DEFAULT_PER_PAGE),
      sort: parseLikedSort(searchParams.get("sort")),
      status: searchParams.get("status") ?? undefined,
      participationType: parseParticipationType(
        searchParams.get("participationType"),
      ),
    };

    const data = await getLikedChallengeListServer(filters);

    return NextResponse.json(data, { status: 200 });
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
