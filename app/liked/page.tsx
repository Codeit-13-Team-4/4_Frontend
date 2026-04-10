import { redirect } from "next/navigation";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getMeServer } from "@/features/auth/api/getMeServer";
import { prefetchLikedChallengeList } from "@/features/liked/api/prefetchLikedChallengeList";
import { prefetchLikedProjectList } from "@/features/liked/api/prefetchLikedProjectList";
import {
  parseLikedSort,
  parseParticipationType,
  toStringArray,
} from "@/features/liked/lib/likedSearchParams";
import type {
  LikedChallengeFilter,
  LikedProjectFilter,
} from "@/features/liked/model";
import {
  LikedChallengeCardList,
  LikedFilter,
  LikedProjectCardList,
  LikedSortDropdown,
  LikedTabs,
} from "@/features/liked/ui";

const PAGE_TITLE = "찜한 모임";
const PAGE_DESCRIPTION = "마감되기 전에 지금 바로 참여해보세요";

export default async function LikedPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const userData = await getMeServer();

  if (!userData) {
    redirect("/login");
  }

  const params = await searchParams;
  const tab = typeof params.tab === "string" ? params.tab : undefined;
  const isProjectTab = tab === "project";
  const sort = parseLikedSort(params.sort);
  const challengeFilters: LikedChallengeFilter = {
    status: typeof params.status === "string" ? params.status : undefined,
    participationType: parseParticipationType(params.participationType),
    sort,
  };
  const projectFilters: LikedProjectFilter = {
    status: typeof params.status === "string" ? params.status : undefined,
    projectType: toStringArray(params.projectType),
    positions: toStringArray(params.positions),
    sort,
  };

  const queryClient = isProjectTab
    ? await prefetchLikedProjectList(projectFilters)
    : await prefetchLikedChallengeList(challengeFilters);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex flex-col pt-12">
        <div className="mb-10">
          <h4 className="text-[18px] font-semibold text-gray-50 md:text-[30px]">
            {PAGE_TITLE}
          </h4>
          <p className="text-[14px] font-medium text-[#BDBDBD] md:text-[20px]">
            {PAGE_DESCRIPTION}
          </p>
        </div>

        <div className="mb-8">
          <LikedTabs />
        </div>

        <div className="flex flex-col items-end md:flex-row md:items-center md:justify-between">
          <LikedFilter />
          <div className="mr-5 mb-4 flex items-center md:mb-0">
            <LikedSortDropdown />
          </div>
        </div>

        {isProjectTab ? (
          <LikedProjectCardList filters={projectFilters} />
        ) : (
          <LikedChallengeCardList filters={challengeFilters} />
        )}

        <div className="pointer-events-none fixed right-0 bottom-0 left-0 z-40 h-30 bg-linear-to-b from-gray-900/0 to-gray-900" />
      </section>
    </HydrationBoundary>
  );
}
