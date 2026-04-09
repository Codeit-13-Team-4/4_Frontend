import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "@/shared/lib/errors/ApiError";
import { getLikedProjectListServer } from "@/features/liked/api/getLikedProjectList.server";
import {
  parseLikedSortParam,
  parseNumberParam,
} from "@/features/liked/api/likedRouteParsers";
import type { LikedProjectFilter } from "@/features/liked/model";

const DEFAULT_START = 0;
const DEFAULT_PER_PAGE = 10;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const filters: LikedProjectFilter = {
      start: parseNumberParam(searchParams.get("start"), DEFAULT_START),
      perPage: parseNumberParam(searchParams.get("perPage"), DEFAULT_PER_PAGE),
      sort: parseLikedSortParam(searchParams.get("sort")),
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
