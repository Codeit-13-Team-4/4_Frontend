import { useMutation } from "@tanstack/react-query";
import { getPresignedUrl } from "../api/getPresignedUrl";
import { uploadToS3 } from "../api/uploadToS3";

async function uploadProfileImage(file: File): Promise<string> {
  const { url, fields, path } = await getPresignedUrl(file);
  console.log(`${url}${path}`);
  await uploadToS3({ url, fields, file });
  return `${url}${path}`;
}

export function useUploadProfileImage() {
  return useMutation({
    mutationFn: uploadProfileImage,
  });
}
