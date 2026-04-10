import type { ParticipationType } from "@/features/challenges/model";
import type { LikedSortType } from "@/features/liked/model";

function getSingleValue(value: string | string[] | null | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value ?? undefined;
}

export function parseNumberParam(value: string | null, fallback: number) {
  const parsed = Number(value);

  if (Number.isNaN(parsed) || parsed < 0) {
    return fallback;
  }

  return parsed;
}

export function parseParticipationType(
  value: string | string[] | null | undefined,
): ParticipationType | undefined {
  const singleValue = getSingleValue(value);

  if (singleValue === "INSTANT" || singleValue === "APPROVAL") {
    return singleValue;
  }

  return undefined;
}

export function parseLikedSort(
  value: string | string[] | null | undefined,
): LikedSortType | undefined {
  const singleValue = getSingleValue(value);

  if (
    singleValue === "latest" ||
    singleValue === "popular" ||
    singleValue === "deadline" ||
    singleValue === "oldest"
  ) {
    return singleValue;
  }

  return undefined;
}

export function toStringArray(value: string | string[] | null | undefined) {
  if (typeof value === "string") {
    return [value];
  }

  return Array.isArray(value) ? value : [];
}
