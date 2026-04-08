import { fetchClient } from "@/shared/lib/client/fetchClient";

interface UploadToS3Params {
  url: string;
  fields: Record<string, string>;
  file: File;
}

export async function uploadToS3({
  url,
  fields,
  file,
}: UploadToS3Params): Promise<void> {
  const formData = new FormData();

  formData.append("url", url);

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value);
  });

  formData.append("file", file);

  await fetchClient("/api/files/upload/s3", {
    method: "POST",
    body: formData,
  });
}
