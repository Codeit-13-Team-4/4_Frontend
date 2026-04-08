import type { ProjectDetail } from "@/features/projectsDetail/types/projectsDetail";
import { formatDate } from "@/shared/utils";
import { ScrollArea } from "@/shared/ui/ScrollArea/ScrollArea";
import Image from "next/image";
import { CalendarIcon, Clock } from "@/shared/icons";

interface ProjectDetailLeftPanelProps {
  project: ProjectDetail;
}

export default function ProjectDetailLeftPanel({
  project,
}: ProjectDetailLeftPanelProps) {
  const startDate = formatDate(new Date(project.projectStartDate));
  const endDate = formatDate(new Date(project.projectEndDate));
  const recruitEndDate = formatDate(new Date(project.recruitEndDate));

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-600 lg:text-lg">
          프로젝트 소개
        </p>
        <ScrollArea className="h-43 rounded-xl border border-gray-700 bg-gray-900 px-4 py-3">
          <p className="text-sm leading-relaxed text-gray-50 lg:text-base">
            {project.description}
          </p>
        </ScrollArea>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex shrink-0 items-center gap-1.5 text-sm text-gray-500 lg:text-lg">
            <Clock width={18} height={18} className="text-gray-600" />
            <span>모집 마감</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 lg:text-lg">
              {recruitEndDate}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex shrink-0 items-center gap-1.5 text-sm text-gray-500 lg:text-lg">
            <CalendarIcon width={18} height={18} className="text-gray-600" />
            <span>진행 기간</span>
          </div>
          <span className="text-sm text-gray-400 lg:text-lg">
            {startDate} ~ {endDate}
          </span>
        </div>
      </div>
    </div>
  );
}
