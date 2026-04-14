import { z } from "zod";
import {
  CONTACT_METHOD,
  POSITION_LABELS,
  PROJECT_TYPE_LABEL,
  TECH_STACK,
} from "./project.constants";

const positionEnum = z.enum(
  Object.keys(POSITION_LABELS) as [
    keyof typeof POSITION_LABELS,
    ...Array<keyof typeof POSITION_LABELS>,
  ],
);

const techStackEnum = z.enum(
  Object.keys(TECH_STACK) as [
    keyof typeof TECH_STACK,
    ...Array<keyof typeof TECH_STACK>,
  ],
);

const projectTypeEnum = z.enum(
  Object.keys(PROJECT_TYPE_LABEL) as [
    keyof typeof PROJECT_TYPE_LABEL,
    ...Array<keyof typeof PROJECT_TYPE_LABEL>,
  ],
  { error: "프로젝트 목적을 선택해주세요." },
);

const contactMethodEnum = z.enum(
  Object.keys(CONTACT_METHOD) as [
    keyof typeof CONTACT_METHOD,
    ...Array<keyof typeof CONTACT_METHOD>,
  ],
  { error: "연락 방법을 선택해주세요." },
);

export const projectFormSchema = z
  .object({
    recruitEndDate: z.date({ error: "모집 마감일을 설정해주세요." }),
    projectStart: z.date({ error: "진행 시작일을 설정해주세요." }),
    projectEnd: z.date({ error: "진행 종료일을 설정해주세요." }),
    projectType: projectTypeEnum,
    positions: z.array(positionEnum).min(1, "모집 포지션을 선택해주세요."),
    techStacks: z.array(techStackEnum).min(1, "기술 스택을 선택해주세요."),
    maxMembers: z.number().min(1, "모집 정원을 설정해주세요."),
    contactMethod: contactMethodEnum,
    contactLink: z.string().min(1, "연락 링크를 입력해주세요."),
    title: z.string().min(1, "프로젝트 제목을 입력해주세요."),
    content: z
      .string()
      .min(1, "프로젝트 소개글을 입력해주세요.")
      .refine((html) => html.replace(/<[^>]*>/g, "").trim().length > 0, {
        message: "프로젝트 소개글을 입력해주세요.",
      }),
  })
  .refine(({ recruitEndDate, projectStart }) => recruitEndDate < projectStart, {
    message: "모집 마감일은 진행 시작일 이전이어야 합니다.",
    path: ["recruitEndDate"],
  })
  .refine(({ projectStart, projectEnd }) => projectStart < projectEnd, {
    message: "진행 종료일은 시작일 이후여야 합니다.",
    path: ["projectEnd"],
  });

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
