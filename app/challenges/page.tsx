import { ParticipationType } from "@/features/challenges/model";
import {
  ChallengesCardList,
  ChallengesCreateButton,
  ChallengesFilter,
  ChallengesSearchInput,
  ChallengesSortDropdown,
} from "@/features/challenges/ui";

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

  return (
    <main className="flex flex-col">
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
      <div className="pointer-events-none fixed bottom-0 z-50 h-68 w-full bg-linear-to-b from-gray-900/0 to-gray-900" />
    </main>
  );
}
