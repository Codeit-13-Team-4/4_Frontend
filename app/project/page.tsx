import { createSideProject } from "@/features/project/api/createSideProject";
import { ProjectCard } from "@/features/project/ui/ProjectCard/ProjectCard";
import { ProjectCreateButton } from "@/features/project/ui/ProjectCreateButton/ProjectCreateButton";
import { ProjectFilter } from "@/features/project/ui/ProjectFilter/ProjectFilter";
import { ProjectSortDropdown } from "@/features/project/ui/ProjectSortDropdown/ProjectSortDropdown";
import { SearchInput } from "@/features/project/ui/SearchInput/SearchInput";
import { Button } from "@/shared/ui";

export default async function ProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = params.q;

  return (
    <main>
      <div className="mb-6 flex items-center justify-between">
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
        {/* <Button variant="primary" className="p-3">
          + 프로젝트 개설
        </Button> */}
        <ProjectCreateButton />
      </div>

      <div className="flex justify-between">
        <ProjectFilter />
        <ProjectSortDropdown />
      </div>

      <ProjectCard />
    </main>
  );
}
