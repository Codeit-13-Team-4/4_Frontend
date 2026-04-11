import { z } from "zod";

export const verificationsSchema = z.object({
  content: z
    .string()
    .min(1, "설명을 입력해주세요.")
    .max(500, "설명은 500자 이하로 작성해주세요.")
    .trim(),

  imageUrls: z
    .custom<FileList>(
      (files) => files instanceof FileList && files.length > 0,
      {
        message: "이미지를 첨부해주세요.",
      },
    )
    .refine(
      (files) =>
        !files || files.length === 0
          ? false
          : files[0].type.startsWith("image/"),
      {
        message: "이미지 파일만 업로드 가능합니다.",
      },
    )
    .refine(
      (files) =>
        !files || files.length === 0
          ? false
          : files[0].size <= 10 * 1024 * 1024,
      {
        message: "이미지 크기는 10MB 이하만 가능합니다.",
      },
    ),
});

export type VerificationsFormValues = z.infer<typeof verificationsSchema>;
