import { Skeleton } from "@/shared/ui";
import { ProjectCardSkeleton } from "@/features/projects/list/ui/ProjectCardList/ProjectCard/ProjectCardSkeleton";

export default function ProjectsLoading() {
  return (
    <main className="flex flex-col pt-12">
      {/* 타이틀 + 검색 */}
      <div className="mb-6 flex flex-col md:justify-between lg:flex-row lg:items-center">
        <div>
          <h4 className="text-[18px] font-semibold text-gray-50 md:text-[30px]">
            사이드 프로젝트
          </h4>
          <p className="text-[14px] font-medium text-[#BDBDBD] md:text-[20px]">
            아이디어를 현실로 만들어요. 팀원을 모집하고 함께 성장하세요.
          </p>
        </div>
        <div className="mt-7 lg:mt-0">
          <Skeleton className="h-10 w-full rounded-lg lg:w-lg" />
        </div>
      </div>

      {/* 개설 버튼 (데스크탑) */}
      <div className="mb-10 hidden justify-end font-semibold md:visible md:flex">
        <Skeleton className="h-10 w-28 rounded-lg" />
      </div>

      {/* 필터 + 정렬 */}
      <div className="flex flex-col items-end md:flex-row md:items-center md:justify-between">
        <div className="mb-6 flex gap-3 md:mb-0">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
        <Skeleton className="mr-5 mb-4 h-8 w-24 rounded-full md:mb-0" />
      </div>

      {/* 카드 그리드 */}
      <div className="grid grid-cols-1 justify-center gap-3 px-4 md:mt-6 md:grid-cols-2 md:px-0 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}
