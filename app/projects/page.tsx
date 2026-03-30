import {
  ProjectCardList,
  ProjectCreateButton,
  ProjectFilter,
  ProjectSortDropdown,
  SearchInput,
} from "@/features/projects/ui";

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
  };

  return (
    <main className="flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:md:items-center md:justify-between">
        <div>
          <h4 className="text-[30px] font-semibold text-gray-50">
            사이드 프로젝트
          </h4>
          <p className="text-[20px] font-medium text-[#BDBDBD]">
            아이디어를 현실로 만들어요. 팀원을 모집하고 함께 성장하세요.
          </p>
        </div>

        <div>
          <SearchInput />
        </div>
      </div>
      <div className="mb-10 flex justify-end font-semibold">
        <ProjectCreateButton />
      </div>

      <div className="flex justify-between">
        <ProjectFilter />
        <div className="mr-5 flex items-center">
          <ProjectSortDropdown />
        </div>
      </div>

      <ProjectCardList filters={filters} />
    </main>
  );
}
