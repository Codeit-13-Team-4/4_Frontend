import { fetchClient } from "@/shared/lib/client/fetchClient";

interface PresignedUrlResponse {
  path: string;
  url: string;
  fields: Record<string, string>;
}

export async function getPresignedUrl(
  file: File,
): Promise<PresignedUrlResponse> {
  const params = new URLSearchParams({
    mimeType: file.type,
    fileName: file.name,
  });

  return fetchClient(`/api/files/upload?${params}`).then((res) => res.json());
}
