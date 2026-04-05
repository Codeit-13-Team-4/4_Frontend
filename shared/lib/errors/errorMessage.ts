const ERROR_MESSAGES: Record<number, string> = {
  400: "잘못된 요청입니다.",
  401: "로그인이 필요합니다.",
  403: "권한이 없습니다.",
  404: "존재하지 않는 리소스입니다.",
  500: "서버 오류가 발생했습니다.",
};

export function getErrorMessage(
  status: number,
  backendMessage?: string,
): string {
  if (status === 409) return backendMessage ?? "이미 처리된 요청입니다.";
  return ERROR_MESSAGES[status] ?? backendMessage ?? "요청에 실패했습니다.";
}
