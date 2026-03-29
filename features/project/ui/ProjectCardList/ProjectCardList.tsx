"use client";
import { useGetProjectList } from "../../hooks/useGetProject";
import { ProjectCard } from "../ProjectCard/ProjectCard";

export function ProjectCardList() {
  const { data, isLoading } = useGetProjectList();
  const cardData = data?.data;
  return (
    <div className="flex flex-wrap gap-3">
      {cardData?.map((item, index) => {
        return <ProjectCard data={item} key={index} />;
      })}
    </div>
  );
}
