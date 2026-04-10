import type { ChallengeCardProps } from "@/features/challenges/model";
import type { ChallengesDetail } from "@/features/challengesDetail/types/challengesDetail";
import { ApiError } from "@/shared/lib/errors/ApiError";
import { fetchWithAuthRetry } from "@/shared/lib/server/auth";
import { LIKED_BACKEND_PER_PAGE } from "./liked.constants";
import type {
  BackendLikedChallengeListResponse,
  LikedChallengeFilter,
  LikedChallengeListItem,
  LikedChallengeListResponse,
  LikedSortType,
} from "@/features/liked/model";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function createSearchParams(filters: LikedChallengeFilter) {
  const params = new URLSearchParams({
    start: String(filters.start ?? 0),
    perPage: String(filters.perPage ?? 10),
    sort: "createdAt",
    order: filters.sort === "oldest" ? "ASC" : "DESC",
  });

  return params;
}

function getJoinButtonLabel(challenge: ChallengesDetail) {
  if (challenge.isHost) return "내 모임";
  if (challenge.isMember) return "참여중";
  if (challenge.myParticipationStatus === "PENDING") return "승인 대기";
  if (challenge.myParticipationStatus === "REJECTED") return "다시 신청";
  if (!challenge.isJoinable) return "참여 불가";

  return "참여하기";
}

function mapChallengeDetailToCard(
  challenge: ChallengesDetail,
): ChallengeCardProps {
  return {
    id: challenge.id,
    title: challenge.title,
    host: challenge.host,
    status: challenge.status,
    participationType: challenge.joinType,
    tags: challenge.tags,
    verificationFrequency: challenge.verificationFrequency,
    startDate: challenge.startDate,
    endDate: challenge.endDate,
    recruitDeadline: challenge.recruitDeadline,
    daysLeft: challenge.daysLeft,
    participantCount: challenge.participantCount,
    maxParticipants: challenge.maxParticipants,
    progressRate: challenge.progressRate,
    viewCount: challenge.viewCount,
    commentCount: challenge.commentCount,
    isBookmarked: challenge.isBookmarked,
    isJoinable: challenge.isJoinable,
    joinButtonLabel: getJoinButtonLabel(challenge),
    isMember: challenge.isMember,
    isHost: challenge.isHost,
    isLiked: challenge.isLiked,
    myParticipationStatus: challenge.myParticipationStatus,
  };
}

function matchesFilter(
  challenge: ChallengeCardProps,
  filters: Pick<LikedChallengeFilter, "status" | "participationType">,
) {
  if (filters.status && challenge.status !== filters.status) {
    return false;
  }

  if (
    filters.participationType &&
    challenge.participationType !== filters.participationType
  ) {
    return false;
  }

  return true;
}

async function fetchLikedChallengePage(filters: LikedChallengeFilter) {
  return fetchWithAuthRetry<BackendLikedChallengeListResponse>(
    `${BASE_URL}/challenges/me/liked?${createSearchParams(filters)}`,
  );
}

async function fetchChallengeCard(challengeId: number) {
  try {
    const response = await fetchWithAuthRetry<{ data: ChallengesDetail }>(
      `${BASE_URL}/challenges/${challengeId}`,
    );

    return mapChallengeDetailToCard(response.data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

async function mapEntriesToCards(
  entries: LikedChallengeListItem[],
  filters?: Pick<LikedChallengeFilter, "status" | "participationType">,
) {
  const cards = await Promise.all(
    entries.map(async (entry) => fetchChallengeCard(entry.challengeId)),
  );

  const challengeCards = cards.filter(
    (card): card is ChallengeCardProps => card !== null,
  );

  if (!filters) {
    return challengeCards;
  }

  return challengeCards.filter((challenge) =>
    matchesFilter(challenge, filters),
  );
}

function sortChallengeCards(
  challengeCards: ChallengeCardProps[],
  sort: LikedSortType | undefined,
) {
  if (sort === "popular") {
    return [...challengeCards].sort((a, b) => b.viewCount - a.viewCount);
  }

  if (sort === "deadline") {
    return [...challengeCards].sort(
      (a, b) =>
        new Date(a.recruitDeadline).getTime() -
        new Date(b.recruitDeadline).getTime(),
    );
  }

  return challengeCards;
}

async function fetchAllLikedChallengeEntries(filters: LikedChallengeFilter) {
  const entries: LikedChallengeListItem[] = [];
  let start = 0;
  let total = 0;

  do {
    const page = await fetchLikedChallengePage({
      ...filters,
      start,
      perPage: LIKED_BACKEND_PER_PAGE,
    });

    total = page.total;
    entries.push(...page.data);

    if (page.data.length < LIKED_BACKEND_PER_PAGE) {
      break;
    }

    start += LIKED_BACKEND_PER_PAGE;
  } while (start < total);

  return entries;
}

export async function getLikedChallengeListServer(
  filters: LikedChallengeFilter = {},
): Promise<LikedChallengeListResponse> {
  const {
    start = 0,
    perPage = 10,
    status,
    participationType,
    sort = "latest",
  } = filters;
  const hasLocalFilters = Boolean(status || participationType);
  const hasLocalSorting = sort === "popular" || sort === "deadline";

  if (!hasLocalFilters && !hasLocalSorting) {
    const likedPage = await fetchLikedChallengePage(filters);
    const data = await mapEntriesToCards(likedPage.data);

    return {
      data,
      total: likedPage.total,
    };
  }

  const entries = await fetchAllLikedChallengeEntries(filters);
  const filteredData = await mapEntriesToCards(entries, {
    status,
    participationType,
  });
  const sortedData = sortChallengeCards(filteredData, sort);

  return {
    data: sortedData.slice(start, start + perPage),
    total: sortedData.length,
  };
}
