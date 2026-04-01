import type { ProjectDetail } from "@/features/projectsDetail/types/projectsDetail";
import { Progress, Separator } from "@/shared/ui";
import Image from "next/image";
import {
  PositionBadge,
  TechBadge,
} from "@/features/projectsDetail/ui/ProjectDetailCard";
import { CONTACT_METHOD } from "@/features/projectsDetail/model/projects.constants";

interface ProjectDetailRightPanelProps {
  project: ProjectDetail;
}

export default function ProjectDetailRightPanel({
  project,
}: ProjectDetailRightPanelProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center">
        <div className="flex shrink-0 items-center gap-1.5 text-sm text-gray-500 lg:text-lg">
          <Image
            src="/projectDetail/check.svg"
            alt="모집 포지션"
            width={18}
            height={18}
          />
          <span>모집 포지션</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.positions.map((position) => (
            <PositionBadge key={position} position={position} />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-start">
        <div className="flex shrink-0 items-center gap-1.5 text-sm text-gray-500 lg:text-lg">
          <Image
            src="/projectDetail/wand.svg"
            alt="기술스택"
            width={18}
            height={18}
          />
          <span>기술스택</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.techStacks.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>
      </div>

      <Separator className="my-5 hidden bg-gray-700 lg:block" />

      <div className="flex items-center gap-1.5 text-sm text-gray-500 lg:text-lg">
        <Image
          src="/projectDetail/link.svg"
          alt="연락 방법"
          width={18}
          height={18}
        />
        <span>연락 방법</span>
        {project.contactMethod === "email" ? (
          <span className="text-sm text-gray-400 lg:text-lg">
            {CONTACT_METHOD[project.contactMethod]} ({project.contactLink})
          </span>
        ) : (
          <a
            href={project.contactLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mint-500 text-sm underline-offset-2 hover:underline lg:text-lg"
          >
            {CONTACT_METHOD[project.contactMethod]} ({project.contactLink})
          </a>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-sm text-gray-500 lg:text-lg">
            <Image
              src="/projectDetail/people.svg"
              alt="참여인원"
              width={18}
              height={18}
            />
            <span>참여인원</span>
          </div>
          <span className="text-sm text-gray-400 lg:text-lg">
            {project.currentMembers} / {project.maxMembers}
          </span>
        </div>
        <Progress value={project.currentMembers} max={project.maxMembers} />
      </div>
    </div>
  );
}
