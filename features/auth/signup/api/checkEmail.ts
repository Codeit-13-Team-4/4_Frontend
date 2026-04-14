import { fetchClient } from "@/shared/lib/client/fetchClient";

interface CheckEmailResponse {
  available: boolean;
  message: string;
}

export async function checkEmail(email: string): Promise<CheckEmailResponse> {
  const params = new URLSearchParams({
    email: email.trim(),
  });

  const response = await fetchClient(`/api/auth/check-email?${params}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = (await response.json()) as Partial<CheckEmailResponse>;

  return {
    available: data.available ?? true,
    message: data.message ?? "사용 가능한 이메일입니다.",
  };
}
