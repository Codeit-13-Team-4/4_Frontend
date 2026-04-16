import { useMutation } from "@tanstack/react-query";

import { ApiError } from "@/shared/lib/errors/ApiError";
import { getPresignedUrl } from "@/shared/lib/upload/getPresignedUrl";
import { uploadToS3 } from "@/shared/lib/upload/uploadToS3";
import { toast } from "sonner";

async function uploadImage(file: File): Promise<string> {
  const { url, fields, path } = await getPresignedUrl(file);
  await uploadToS3({ url, fields, file });
  return `${url}${path}`;
}

export function useUploadImage() {
  return useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      if (error instanceof ApiError && error.status === 400) {
        toast.error("지원하지 않는 이미지 형식입니다.");
      } else {
        toast.error("이미지 업로드에 실패했습니다.");
      }
    },
  });
}
