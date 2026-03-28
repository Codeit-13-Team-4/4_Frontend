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

export function ProjectCard() {
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
          <h4 className="text-[20px] text-gray-50">프로젝트 제목</h4>
          <DeadlineBadge endDate="2026-03-25" />
        </div>
        <p className="text-[14px] text-gray-400">
          프로젝트 소개글입니다 .프로젝트 소개글입니다. 프로젝트 소개글입니다.
        </p>
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
            <span className="text-[14px] text-gray-400">76</span>
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
