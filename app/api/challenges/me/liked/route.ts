import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/shared/lib/errors/ApiError";
import { getLikedChallengeListServer } from "@/features/liked/api/getLikedChallengeList.server";
import {
  parseLikedSortParam,
  parseNumberParam,
} from "@/features/liked/api/likedRouteParsers";
import type { LikedChallengeFilter } from "@/features/liked/model";
import type { ParticipationType } from "@/features/challenges/model";

const DEFAULT_START = 0;
const DEFAULT_PER_PAGE = 10;

function parseParticipationType(
  value: string | null,
): ParticipationType | undefined {
  if (value === "INSTANT" || value === "APPROVAL") {
    return value;
  }

  return undefined;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters: LikedChallengeFilter = {
      start: parseNumberParam(searchParams.get("start"), DEFAULT_START),
      perPage: parseNumberParam(searchParams.get("perPage"), DEFAULT_PER_PAGE),
      sort: parseLikedSortParam(searchParams.get("sort")),
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
