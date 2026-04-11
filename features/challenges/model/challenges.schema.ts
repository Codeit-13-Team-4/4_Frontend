import { z } from "zod";

export const challengesCreateSchema = z
  .object({
    title: z.string().min(1, "챌린지 제목을 입력해주세요."),
    content: z
      .string()
      .min(1, "챌린지 소개글을 입력해주세요.")
      .refine(
        (html) => {
          const text = html.replace(/<[^>]*>/g, "").trim();
          return text.length > 0;
        },
        { message: "챌린지 소개글을 입력해주세요." },
      ),
    tags: z
      .array(z.string().max(6, "태그는 6글자 이하로 입력해주세요."))
      .min(1, "태그를 최소 1개 입력해주세요.")
      .max(3, "태그는 최대 3개까지 입력할 수 있습니다."),
    recruitDeadline: z.date({ error: "모집 마감일을 설정해주세요." }),
    challengeStart: z.date({ error: "챌린지 시작일을 설정해주세요." }),
    challengeEnd: z.date({ error: "챌린지 종료일을 설정해주세요." }),
    verificationFrequency: z.enum(
      ["ONCE_A_DAY", "EVERY_WEEKDAY", "ONCE_A_WEEK", "THREE_TIMES_A_WEEK"],
      { error: "인증 빈도를 선택해주세요." },
    ),
    maxParticipants: z
      .number({ error: "최대 참여 인원을 설정해주세요." })
      .min(1, "최대 참여 인원을 설정해주세요."),
    joinType: z.enum(["INSTANT", "APPROVAL"], {
      error: "참여 방식을 선택해주세요.",
    }),
    verificationMethod: z.enum(["TEXT", "IMAGE", "IMAGE_AND_TEXT"], {
      error: "인증 방식을 선택해주세요.",
    }),
  })
  .refine(
    ({ recruitDeadline, challengeStart }) => recruitDeadline < challengeStart,
    {
      message: "모집 마감일은 챌린지 시작일 이전이어야 합니다.",
      path: ["recruitDeadline"],
    },
  )
  .refine(({ challengeStart, challengeEnd }) => challengeStart < challengeEnd, {
    message: "챌린지 종료일은 시작일 이후여야 합니다.",
    path: ["challengeEnd"],
  });

export type ChallengesCreateFormValues = z.infer<typeof challengesCreateSchema>;
