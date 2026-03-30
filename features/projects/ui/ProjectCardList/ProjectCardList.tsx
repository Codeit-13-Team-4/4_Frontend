"use client";
import { useGetProjectList } from "../../hooks/useGetProject";
import { ProjectCardProps, ProjectFilter } from "@/features/projects/model";
import { ProjectCard } from "./ProjectCard/ProjectCard";
import { ProjectCardSkeleton } from "./ProjectCard/ProjectCardSkeleton";
import Image from "next/image";

export function ProjectCardList({ filters }: { filters?: ProjectFilter }) {
  const { data, isLoading, isFetching } = useGetProjectList(filters);

  const cardData: ProjectCardProps[] = data?.data;
  // const cardData = [];

  if (cardData?.length === 0)
    return (
      <div className="mt-21 flex flex-col items-center justify-center gap-6 text-gray-400">
        <Image
          src="/images/img_empty.png"
          alt="프로젝트 목록 없음"
          width={120}
          height={70}
        />
        검색 결과가 없습니다.
      </div>
    );

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
      {cardData?.map((item) => {
        return <ProjectCard data={item} key={item.id} />;
      })}

      {isFetching &&
        Array.from({ length: 3 }).map((_, index) => (
          <ProjectCardSkeleton key={`fetch-${index}`} />
        ))}
    </div>
  );
}
