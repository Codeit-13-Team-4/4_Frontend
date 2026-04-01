import { z } from "zod";
import type {
  ProjectType,
  TechStackType,
  PositionType,
  ContactMethodType,
} from "@/features/projectsDetail/types/projectsDetail";

export const editProjectSchema = z.object({
  projectType: z.custom<ProjectType>(),
  title: z.string().min(1, "제목을 입력해주세요"),
  description: z.string().min(1, "소개를 입력해주세요"),
  positions: z
    .custom<PositionType[]>()
    .refine((v) => v.length > 0, "포지션을 선택해주세요"),
  techStacks: z
    .custom<TechStackType[]>()
    .refine((v) => v.length > 0, "기술 스택을 선택해주세요"),
  recruitEndDate: z.date().optional(),
  projectDateRange: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }),
  contactMethod: z.custom<ContactMethodType>(),
  contactLink: z.string().min(1, "연락 링크를 입력해주세요"),
  maxMembers: z
    .number({ error: "모집 인원을 입력해주세요" })
    .min(1, "모집 인원은 1명 이상이어야 합니다"),
});

export type EditFormValues = z.infer<typeof editProjectSchema>;
