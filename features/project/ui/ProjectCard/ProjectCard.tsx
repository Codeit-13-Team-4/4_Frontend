"use client";
import { Button, DeadlineBadge, StatusBadge } from "@/shared/ui";
import { ProjectBadge } from "../ProjectBadge/ProjectBadge";
import { LikeButton } from "../LikeButton/LikeButton";
import { TechStackList } from "../TechStackList/TechStackList";
import { PositionBadgeList } from "../PositionBadgeList/PositionBadgeList";
import Image from "next/image";
import { ProjectApplyModal } from "./ProjectApplyModal";
import { useState } from "react";
import { PositionType } from "../../model/project";

const testTech = [
  "react",
  "figma",
  "golang",
  "html",
  "java",
  "javascript",
  "mysql",
  "nestjs",
  "nodejs",
  "photoshop",
  "python",
  "spring",
  "typescript",
  "unity",
  "vuejs",
  "aws",
  "c",
  "cpp",
  "django",
  "docker",
  "expressjs",
  "firebase",
  "flutter",
  "git",
  "github",
  "graphql",
  "kotlin",
  "kubernetes",
  "mongodb",
  "php",
  "postgresql",
  "redis",
  "supabase",
  "svelte",
  "swift",
  "nextjs",
] as const;

const testPosition: PositionType[] = [
  "fe",
  "be",
  "pm",
  "devops",
  "marketer",
  "designer",
  "android",
  "ios",
];

type ContactMethod = "KAKAO_OPEN_CHAT" | "NOTION" | "DISCORD";

type ProjectStatus =
  | "RECRUITING"
  | "RECRUITMENT_CLOSED"
  | "IN_PROGRESS"
  | "COMPLETED";

interface ProjectHost {
  id: number;
  nickname: string;
  jobLabel?: PositionType[]; // nullable
  profileImageUrl?: string; // nullable
  skills: string[]; // tech stack enum (host용)
}

type ProjectType = "PORTFOLIO" | "CONTEST" | "HACKATHON" | "STARTUP" | "OTHER";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  projectType: ProjectType;
  techStacks: string[]; // enum이라 string[]
  positions: PositionType[];
  maxMembers: number;
  currentMembers: number;
  recruitEndDate: string;
  projectStartDate: string;
  projectEndDate: string;
  contactMethod: ContactMethod;
  contactLink: string;
  status: ProjectStatus;
  viewCount: number;
  commentCount: number;
  liked: boolean;
  host: ProjectHost;
}

export function ProjectCard({ data }) {
  console.log("🚀 ~ ProjectCard ~ data:", data);
  const {
    title,
    description,
    techStacks,
    positions,
    recruitEndDate,
    viewCount,
  } = data;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);
  return (
    <article className="flex h-130 w-105 flex-col gap-7 rounded-[20px] border-2 border-gray-700 bg-gray-800 px-5 pt-10 pb-5">
      <header className="flex items-center justify-between">
        <div className="flex gap-2">
          <StatusBadge status="recruit" />
          <ProjectBadge>포트폴리오</ProjectBadge>
        </div>
        <div>
          <LikeButton />
        </div>
      </header>
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h4 className="text-[20px] text-gray-50">{title}</h4>
          <DeadlineBadge endDate={recruitEndDate} />
        </div>
        <p className="text-[14px] text-gray-400">{description}</p>
      </section>
      <section>
        <h4 className="text-[16px] text-gray-400">기술스택</h4>
        <TechStackList techs={testTech} />
      </section>
      <section>
        <h4 className="text-[16px] text-gray-400">모집 포지션</h4>
        <PositionBadgeList positions={testPosition} />
      </section>
      <section className="flex justify-between">
        <div className="flex gap-6">
          <div className="flex items-center gap-1.25">
            <Image
              src="/icons/common/visibility_on-icon.svg"
              alt=""
              width={24}
              height={24}
            />
            <span className="text-[14px] text-gray-400">{viewCount}</span>
          </div>
          <div className="flex items-center gap-1.25">
            <Image
              src="/icons/common/comment-icon.svg"
              alt=""
              width={24}
              height={24}
            />
            <span className="text-[14px] text-gray-400">24</span>
          </div>
        </div>
        <Button size="sm" onClick={handleOpen}>
          지원하기
        </Button>
        <ProjectApplyModal
          isOpen={isOpen}
          onClose={handleClose}
          setIsOpen={setIsOpen}
        />
      </section>
    </article>
  );
}
