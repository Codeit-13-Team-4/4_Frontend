import { prefetchChallengesList } from "@/features/challenges/list/api/prefetchChallengesList";
import { ParticipationType } from "@/features/challenges/model";
import { ChallengesCardList } from "@/features/challenges/list/ui/ChallengesCardList/ChallengesCardList";
import { ChallengesCreateButton } from "@/features/challenges/list/ui/ChallengesCreateButton/ChallengesCreateButton";
import { ChallengesFilter } from "@/features/challenges/list/ui/ChallengesFilter/ChallengesFilter";
import { ChallengesSearchInput } from "@/features/challenges/list/ui/ChallengesSearchInput/ChallengesSearchInput";
import { ChallengesSortDropdown } from "@/features/challenges/list/ui/ChallengesDropdown/ChallengesSortDropdown";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "챌린지",
  description: "성장을 위한 다양한 개발 챌린지에 참여해 보세요.",
  openGraph: {
    title: "함께 달려서 끝까지 완주하는 개발 챌린지",
    description: "성장을 위한 다양한 개발 챌린지에 참여해 보세요.",
  },
  twitter: {
    card: "summary",
    title: "함께 달려서 끝까지 완주하는 개발 챌린지",
    description: "성장을 위한 다양한 개발 챌린지에 참여해 보세요.",
  },
};

export default async function ChallengesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const filters = {
    keyword: typeof params.tag === "string" ? params.tag : undefined,
    status: typeof params.status === "string" ? params.status : undefined,
    participationType:
      typeof params.participationType === "string"
        ? (params.participationType as ParticipationType)
        : undefined,
    sort: typeof params.sort === "string" ? params.sort : undefined,
  };

  const queryClient = await prefetchChallengesList(filters);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex flex-col pt-12">
        <div className="mb-6 flex flex-col md:justify-between lg:flex-row lg:items-center">
          <div>
            <h4 className="text-[18px] font-semibold text-gray-50 md:text-[30px]">
              챌린지
            </h4>
            <p className="text-[14px] font-medium text-[#BDBDBD] md:text-[20px]">
              목표를 설정하고 함께 도전하며 성장해요
            </p>
          </div>

          <div className="mt-7 lg:mt-0">
            <ChallengesSearchInput />
          </div>
        </div>
        <div className="mb-10 hidden justify-end font-semibold md:visible md:flex">
          <ChallengesCreateButton />
        </div>
        <div className="md:hidden">
          <ChallengesCreateButton circle />
        </div>

        <div className="flex flex-col items-end md:flex-row md:items-center md:justify-between">
          <ChallengesFilter />
          <div className="mr-5 mb-4 flex items-center md:mb-0">
            <ChallengesSortDropdown />
          </div>
        </div>

        <ChallengesCardList filters={filters} />
        <div className="pointer-events-none fixed bottom-0 z-50 h-30 w-full bg-linear-to-b from-gray-900/0 to-gray-900" />
      </main>
    </HydrationBoundary>
  );
}
