"use client";

import { useRouter } from "next/navigation";
import { ProjectForm } from "@/features/projects/ui";
import { useProjectsDetail } from "@/features/projects/detail/hooks/useProjectsDetail";
import { useUpdateProjectsDetail } from "@/features/projects/edit/hooks/useUpdateProjectsDetail";
import { mapDetailToFormValues } from "@/features/projects/edit/model/mapDetailToFormValues";
import { formatDate } from "@/shared/utils";
import type { ProjectFormValues } from "@/features/projects/model";

export function ProjectsEditForm({ projectId }: { projectId: number }) {
  const router = useRouter();
  const { data } = useProjectsDetail(projectId);
  const { mutate, isPending } = useUpdateProjectsDetail(projectId);

  const handleSubmit = (values: ProjectFormValues) => {
    mutate(
      {
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
      },
      { onSuccess: () => router.replace(`/projects/${projectId}`) },
    );
  };

  return (
    <ProjectForm
      defaultValues={mapDetailToFormValues(data)}
      onSubmit={handleSubmit}
      submitLabel="수정하기"
      isPendingExternal={isPending}
      cancelHref={`/projects/${projectId}`}
    />
  );
}
