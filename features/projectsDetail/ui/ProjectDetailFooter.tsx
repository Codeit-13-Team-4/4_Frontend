import type { ProjectDetail } from "@/features/projectsDetail/types/projectsDetail";
import { GradientButton } from "@/shared/ui";
import Image from "next/image";

interface ProjectDetailFooterProps {
  project: ProjectDetail;
}

export default function ProjectDetailFooter({
  project,
}: ProjectDetailFooterProps) {
  return (
    <div className="flex flex-col gap-4 pt-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-1.5 text-lg text-gray-500">
        <Image
          src="/projectDetail/eyes.svg"
          alt="조회수"
          width={22}
          height={16}
        />
        <span>{project.viewCount}</span>
      </div>
      <GradientButton size="lg" className="h-13 w-full lg:h-15 lg:max-w-60">
        지원하기
      </GradientButton>
    </div>
  );
}
