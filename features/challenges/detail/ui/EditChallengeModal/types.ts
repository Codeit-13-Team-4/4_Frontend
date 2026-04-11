import { z } from "zod";
import type {
  VerificationMethodType,
  VerificationFrequencyType,
  JoinType,
} from "@/features/challenges/detail/model/challengesDetail";

export const editChallengeSchema = z.object({
  title: z.string().min(1, "제목을 입력해주세요"),
  description: z.string().min(1, "소개를 입력해주세요"),
  tags: z
    .array(z.string().max(6, "태그는 최대 6자까지 입력 가능합니다"))
    .max(3, "태그는 최대 3개까지 추가할 수 있습니다"),
  verificationMethod: z.custom<VerificationMethodType>(),
  verificationFrequency: z.custom<VerificationFrequencyType>(),
  joinType: z.custom<JoinType>(),
  recruitDeadline: z.date().optional(),
  challengeDateRange: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }),
  maxParticipants: z
    .number({ error: "모집 인원을 입력해주세요" })
    .min(1, "모집 인원은 1명 이상이어야 합니다"),
});

export type EditChallengeFormValues = z.infer<typeof editChallengeSchema>;
