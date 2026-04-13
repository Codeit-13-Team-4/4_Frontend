"use client";

import { useState } from "react";
import type { ProjectDetail } from "@/features/projects/model";
import { CONTACT_METHOD } from "@/features/projects/model";
import { CalendarIcon, Clock, Check, Link, People, Wand } from "@/shared/icons";
import { Progress } from "@/shared/ui";
import { PositionBadge, TechBadge } from "@/features/projects/ui";
import { formatDate } from "@/shared/utils";
import ProjectDetailActionButtons from "@/features/projects/detail/ui/ProjectDetailActionButtons";

const POSITION_MOBILE_LIMIT = 3;
const TECH_MOBILE_LIMIT = 2;

interface ProjectDetailInfoPanelProps {
  project: ProjectDetail;
}

export default function ProjectDetailInfoPanel({
  project,
}: ProjectDetailInfoPanelProps) {
  const recruitEndDate = formatDate(new Date(project.recruitEndDate));
  const startDate = formatDate(new Date(project.projectStartDate));
  const endDate = formatDate(new Date(project.projectEndDate));

  const [positionExpanded, setPositionExpanded] = useState(false);
  const [techExpanded, setTechExpanded] = useState(false);

  const visiblePositions = positionExpanded
    ? project.positions
    : project.positions.slice(0, POSITION_MOBILE_LIMIT);

  const visibleTechs = techExpanded
    ? project.techStacks
    : project.techStacks.slice(0, TECH_MOBILE_LIMIT);

  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-gray-700 bg-gray-800 px-5 pt-10 pb-5">
      <div className="flex flex-col gap-1 font-medium lg:flex-row lg:items-center lg:gap-3">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock width={18} height={18} />
          <span>모집 마감</span>
        </div>
        <span className="text-gray-400">{recruitEndDate}</span>
      </div>

      <div className="flex flex-col gap-1 font-medium lg:flex-row lg:items-center lg:gap-3">
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarIcon width={18} height={18} />
          <span>진행 기간</span>
        </div>
        <span className="text-gray-400">
          {startDate} ~ {endDate}
        </span>
      </div>

      <div className="flex flex-col items-start gap-2 font-medium lg:flex-row lg:items-center lg:gap-3">
        <div className="flex shrink-0 items-center gap-2 text-gray-600">
          <Check width={18} height={18} />
          <span>모집 포지션</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-wrap gap-2 md:hidden">
            {visiblePositions.map((position) => (
              <PositionBadge key={position} position={position} />
            ))}
            {project.positions.length > POSITION_MOBILE_LIMIT && (
              <button
                className="text-xs text-gray-400 hover:text-gray-200"
                onClick={() => setPositionExpanded((prev) => !prev)}
              >
                {positionExpanded
                  ? "접기"
                  : `+${project.positions.length - POSITION_MOBILE_LIMIT}개 더보기`}
              </button>
            )}
          </div>
          <div className="hidden flex-wrap gap-2 md:flex">
            {project.positions.map((position) => (
              <PositionBadge key={position} position={position} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 font-medium lg:flex-row lg:items-start lg:gap-3">
        <div className="flex shrink-0 items-center gap-2 text-gray-600">
          <Wand width={18} height={18} />
          <span>기술스택</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="flex flex-wrap gap-2 md:hidden">
            {visibleTechs.map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
            {project.techStacks.length > TECH_MOBILE_LIMIT && (
              <button
                className="text-xs text-gray-400 hover:text-gray-200"
                onClick={() => setTechExpanded((prev) => !prev)}
              >
                {techExpanded
                  ? "접기"
                  : `+${project.techStacks.length - TECH_MOBILE_LIMIT}개 더보기`}
              </button>
            )}
          </div>
          <div className="hidden flex-wrap gap-2 md:flex">
            {project.techStacks.map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 font-medium md:flex-row md:items-center md:gap-2">
        <div className="flex items-center gap-2 text-gray-600">
          <Link width={18} height={18} />
          <span>연락 방법</span>
        </div>
        {project.contactMethod === "email" ? (
          <span className="text-sm text-gray-400">
            {CONTACT_METHOD[project.contactMethod]} ({project.contactLink})
          </span>
        ) : (
          <a
            href={project.contactLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mint-500 text-sm underline-offset-2 hover:underline"
          >
            {CONTACT_METHOD[project.contactMethod]}
          </a>
        )}
      </div>

      <div className="flex flex-col gap-2 font-medium">
        <div className="flex items-center gap-2 text-gray-600">
          <People width={18} height={18} />
          <span>참여 인원</span>
        </div>
        <div className="flex items-center gap-2">
          <Progress
            value={project.currentMembers}
            max={project.maxMembers}
            className="flex-1"
          />
          <span className="text-sm text-nowrap text-gray-300">
            <span className="text-mint-500">{project.currentMembers}</span>
            {" / "}
            {project.maxMembers}
          </span>
        </div>
      </div>

      <ProjectDetailActionButtons project={project} />
    </div>
  );
}
