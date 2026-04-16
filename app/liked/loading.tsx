import { Skeleton } from "@/shared/ui";
import { ChallengesCardSkeleton } from "@/features/challenges/list/ui/ChallengesCardList/ChallengesCard/ChallengesCardSkeleton";

export default function LikedLoading() {
  return (
    <section className="flex flex-col pt-12">
      {/* 타이틀 */}
      <div className="mb-10">
        <h4 className="text-[18px] font-semibold text-gray-50 md:text-[30px]">
          찜한 모임
        </h4>
        <p className="text-[14px] font-medium text-[#BDBDBD] md:text-[20px]">
          마감되기 전에 지금 바로 참여해보세요
        </p>
      </div>

      {/* 탭 */}
      <div className="mb-8 flex gap-2">
        <Skeleton className="h-10 w-20 rounded-full" />
        <Skeleton className="h-10 w-20 rounded-full" />
      </div>

      {/* 필터 + 정렬 */}
      <div className="flex flex-col items-end md:flex-row md:items-center md:justify-between">
        <div className="mb-6 flex gap-3 md:mb-0">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
        <Skeleton className="mr-5 mb-4 h-8 w-24 rounded-full md:mb-0" />
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 justify-center gap-3 px-4 md:mt-6 md:grid-cols-2 md:px-0 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ChallengesCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
