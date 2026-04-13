"use client";

import { ProjectCardProps, ProjectFilter } from "@/features/projects/model";
import { ProjectCard } from "./ProjectCard/ProjectCard";
import { ProjectCardSkeleton } from "./ProjectCard/ProjectCardSkeleton";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useGetProjectList } from "@/features/projects/list/hooks/useGetProjectList";

export function ProjectCardList({ filters }: { filters?: ProjectFilter }) {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useGetProjectList(filters);

  const { ref } = useInView({
    threshold: 0.1,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });
  const cardData: ProjectCardProps[] =
    data?.pages.flatMap((page) => page.data) ?? [];

  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-3 md:mt-6 md:justify-start">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProjectCardSkeleton key={index} />
        ))}
      </div>
    );
  }
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

  return (
    <div className="grid grid-cols-1 justify-center gap-3 px-4 md:mt-6 md:grid-cols-2 md:px-0 lg:grid-cols-3">
      {cardData?.map((item) => {
        return <ProjectCard data={item} key={item.id} />;
      })}

      {isFetchingNextPage &&
        Array.from({ length: 3 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      <div className="h-2 w-full" ref={ref} />
    </div>
  );
}
