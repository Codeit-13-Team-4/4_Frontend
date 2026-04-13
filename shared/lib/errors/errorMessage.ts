const ERROR_MESSAGES: Record<number, string> = {
  400: "요청이 올바르지 않습니다.",
  401: "로그인이 필요한 서비스입니다.",
  403: "해당 기능에 대한 접근 권한이 없습니다.",
  404: "요청하신 정보를 찾을 수 없습니다.",
  500: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요",
};

export function getErrorMessage(
  status: number,
  backendMessage?: string,
): string {
  return ERROR_MESSAGES[status] ?? backendMessage ?? "요청에 실패했습니다.";
}
