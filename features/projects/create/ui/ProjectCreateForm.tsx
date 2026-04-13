"use client";

import { useState } from "react";
import { ProjectForm } from "@/features/projects/ui";
import { useCreateProject } from "@/features/projects/create/hooks/useCreateProject";
import { CreateAlertModal } from "@/features/projects/create/ui/ProjectCreateModal/CreateAlertModal";
import { formatDate } from "@/shared/utils";
import type { ProjectFormValues } from "@/features/projects/model";

export function ProjectCreateForm() {
  const [createAlertOpen, setCreateAlertOpen] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState<number | undefined>(
    undefined,
  );

  const { mutate, isPending } = useCreateProject((data) => {
    setCreatedProjectId(data.id);
    setCreateAlertOpen(true);
  });

  const handleSubmit = (values: ProjectFormValues) => {
    mutate({
      title: values.title,
      description: values.content,
      projectType: values.projectType,
      techStacks: values.techStacks,
      positions: values.positions,
      maxMembers: values.maxMembers,
      recruitEndDate: formatDate(values.recruitEndDate) as string,
      projectStartDate: formatDate(values.projectStart) as string,
      projectEndDate: formatDate(values.projectEnd) as string,
      contactMethod: values.contactMethod,
      contactLink: values.contactLink,
    });
  };

  return (
    <>
      <ProjectForm onSubmit={handleSubmit} isPendingExternal={isPending} />
      <CreateAlertModal
        open={createAlertOpen}
        onOpenChange={setCreateAlertOpen}
        id={createdProjectId}
      />
    </>
  );
}
