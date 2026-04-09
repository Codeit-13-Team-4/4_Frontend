import type { LikedSortType } from "@/features/liked/model";

export function parseNumberParam(value: string | null, fallback: number) {
  const parsed = Number(value);

  if (Number.isNaN(parsed) || parsed < 0) {
    return fallback;
  }

  return parsed;
}

export function parseLikedSortParam(
  value: string | null,
): LikedSortType | undefined {
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
