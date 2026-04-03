"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSideProject } from "../api/createSideProject";
import { ProjectCardProps } from "../model";

export const useCreateProject = (
  onSuccess: (data: ProjectCardProps) => void,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createSideProject,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projectList"] });
      onSuccess(data);
    },
  });
};
