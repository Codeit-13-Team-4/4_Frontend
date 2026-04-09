import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/shared/lib/errors/ApiError";
import { getLikedProjectListServer } from "@/features/liked/api/getLikedProjectList.server";
import type { LikedProjectFilter } from "@/features/liked/model";

const DEFAULT_START = 0;
const DEFAULT_PER_PAGE = 10;

function parseNumber(value: string | null, fallback: number) {
  const parsed = Number(value);

  if (Number.isNaN(parsed) || parsed < 0) {
    return fallback;
  }

  return parsed;
}

function parseLikedSort(value: string | null): LikedProjectFilter["sort"] {
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

    const filters: LikedProjectFilter = {
      start: parseNumber(searchParams.get("start"), DEFAULT_START),
      perPage: parseNumber(searchParams.get("perPage"), DEFAULT_PER_PAGE),
      sort: parseLikedSort(searchParams.get("sort")),
      status: searchParams.get("status") ?? undefined,
      projectType: searchParams.getAll("projectType"),
      positions: searchParams.getAll("positions"),
    };

    const data = await getLikedProjectListServer(filters);

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
