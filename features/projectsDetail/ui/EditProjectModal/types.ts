import type {
  ProjectType,
  TechStackType,
  PositionType,
  ContactMethodType,
} from "@/features/projectsDetail/types/projectsDetail";

export interface EditFormValues {
  projectType: ProjectType;
  title: string;
  description: string;
  positions: PositionType[];
  techStacks: TechStackType[];
  recruitEndDate: Date | undefined;
  projectDateRange: { from: Date | undefined; to: Date | undefined };
  contactMethod: ContactMethodType;
  contactLink: string;
  maxMembers: number;
}
