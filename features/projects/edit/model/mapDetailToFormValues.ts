import type { ProjectDetail } from "@/features/projects/model";
import type { ProjectFormValues } from "@/features/projects/model";

export function mapDetailToFormValues(
  detail: ProjectDetail,
): ProjectFormValues {
  return {
    title: detail.title,
    content: detail.description,
    projectType: detail.projectType,
    techStacks: detail.techStacks,
    positions: detail.positions,
    maxMembers: detail.maxMembers,
    recruitEndDate: new Date(detail.recruitEndDate),
    projectStart: new Date(detail.projectStartDate),
    projectEnd: new Date(detail.projectEndDate),
    contactMethod: detail.contactMethod,
    contactLink: detail.contactLink,
  };
}
