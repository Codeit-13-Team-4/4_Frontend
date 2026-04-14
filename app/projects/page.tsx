import { prefetchProjectList } from "@/features/projects/list/api/prefetchProjectList";
import { ProjectCardList } from "@/features/projects/list/ui/ProjectCardList/ProjectCardList";
import { ProjectCreateButton } from "@/features/projects/list/ui/ProjectCreateButton/ProjectCreateButton";
import { ProjectFilter } from "@/features/projects/list/ui/ProjectFilter/ProjectFilter";
import { ProjectSortDropdown } from "@/features/projects/list/ui/ProjectDropdown/ProjectSortDropdown";
import { SearchInput } from "@/features/projects/list/ui/SearchInput/SearchInput";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로젝트",
  description:
    "혼자 하기 힘든 프로젝트, DevUp에서 팀원을 찾고 실전 경험을 쌓으세요.",
  openGraph: {
    title: "함께 완성하는 개발 프로젝트",
    description:
      "혼자 하기 힘든 프로젝트, DevUp에서 팀원을 찾고 실전 경험을 쌓으세요.",
  },
  twitter: {
    card: "summary",
    title: "함께 완성하는 개발 프로젝트",
    description:
      "혼자 하기 힘든 프로젝트, DevUp에서 팀원을 찾고 실전 경험을 쌓으세요.",
  },
};

export default async function ProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const filters = {
    keyword: typeof params.search === "string" ? params.search : undefined,
    status: typeof params.status === "string" ? params.status : undefined,
    projectType:
      typeof params.projectType === "string"
        ? [params.projectType]
        : params.projectType,
    positions:
      typeof params.positions === "string"
        ? [params.positions]
        : params.positions,
    sort: typeof params.sort === "string" ? params.sort : undefined,
    order: typeof params.order === "string" ? params.order : undefined,
  };

  const queryClient = await prefetchProjectList(filters);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex flex-col pt-12">
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
            <SearchInput />
          </div>
        </div>
        <div className="mb-10 hidden justify-end font-semibold md:visible md:flex">
          <ProjectCreateButton />
        </div>
        <div className="md:hidden">
          <ProjectCreateButton circle />
        </div>

        <div className="flex flex-col items-end md:flex-row md:items-center md:justify-between">
          <ProjectFilter />
          <div className="mr-5 mb-4 flex items-center md:mb-0">
            <ProjectSortDropdown />
          </div>
        </div>

        <ProjectCardList filters={filters} />
        <div className="pointer-events-none fixed bottom-0 z-45 h-30 w-full bg-linear-to-b from-gray-900/0 to-gray-900" />
      </main>
    </HydrationBoundary>
  );
}
