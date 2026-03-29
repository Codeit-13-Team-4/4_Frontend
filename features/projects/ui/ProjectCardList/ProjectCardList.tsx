"use client";
import { useGetProjectList } from "../../hooks/useGetProject";
import { ProjectCardProps, ProjectFilter } from "../../model";
import { ProjectCard } from "../ProjectCard/ProjectCard";
import { ProjectCardSkeleton } from "./ProjectCardSkeleton";

export function ProjectCardList({ filters }: { filters?: ProjectFilter }) {
  const { data, isLoading, isFetching } = useGetProjectList(filters);

  const cardData: ProjectCardProps[] = data?.data;

  if (cardData?.length === 0)
    return <div className="text-gray-50">검색 결과가 없습니다.</div>;

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
    <div className="flex flex-wrap gap-3">
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
