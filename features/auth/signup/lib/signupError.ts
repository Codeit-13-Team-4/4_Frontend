import { ApiError } from "@/shared/lib/errors/ApiError";

interface SignupErrorDetailsOptions {
  fallbackMessage: string;
}

interface SignupErrorDetails {
  code: string | null;
  message: string;
}

const SIGNUP_ERROR_MESSAGE_BY_CODE: Record<string, string> = {
  social_account_exists:
    "해당 이메일은 다른 소셜 계정으로 가입되어 있습니다. 해당 소셜 계정으로 로그인해주세요.",
  social_email_exists:
    "이미 가입된 이메일입니다. 기존 계정으로 로그인해주세요.",
  email_exists: "이미 가입된 이메일입니다. 기존 계정으로 로그인해주세요.",
  duplicate_email: "이미 가입된 이메일입니다. 기존 계정으로 로그인해주세요.",
};

function normalizeErrorCode(
  rawCode?: string | null,
  rawMessage?: string | null,
) {
  const trimmedCode = rawCode?.trim();

  if (trimmedCode) {
    return trimmedCode;
  }

  const trimmedMessage = rawMessage?.trim();

  if (trimmedMessage && /^[a-z0-9_]+$/.test(trimmedMessage)) {
    return trimmedMessage;
  }

  return null;
}

export function getDuplicateEmailErrorMessage(error: unknown) {
  if (error instanceof ApiError && error.code) {
    if (error.code in SIGNUP_ERROR_MESSAGE_BY_CODE) {
      return error.message || SIGNUP_ERROR_MESSAGE_BY_CODE[error.code];
    }
  }

  if (!(error instanceof Error)) return null;

  const message = error.message.trim();
  if (!message) return null;

  return message.includes("이미 가입된 이메일") ? message : null;
}

export function getSignupErrorDetails(
  rawMessage: string | null | undefined,
  rawCode: string | null | undefined,
  options: SignupErrorDetailsOptions,
): SignupErrorDetails {
  const code = normalizeErrorCode(rawCode, rawMessage);

  if (code && SIGNUP_ERROR_MESSAGE_BY_CODE[code]) {
    return {
      code,
      message: SIGNUP_ERROR_MESSAGE_BY_CODE[code],
    };
  }

  const message = rawMessage?.trim();

  if (!message) {
    return {
      code,
      message: options.fallbackMessage,
    };
  }

  const loweredMessage = message.toLowerCase();

  if (
    loweredMessage.includes("position should not be null") ||
    loweredMessage.includes("position must be one of")
  ) {
    return {
      code,
      message: "포지션을 선택해주세요.",
    };
  }

  if (
    loweredMessage.includes("email") &&
    (loweredMessage.includes("exists") ||
      loweredMessage.includes("already") ||
      loweredMessage.includes("duplicate"))
  ) {
    return {
      code: code ?? "email_exists",
      message: "이미 가입된 이메일입니다. 기존 계정으로 로그인해주세요.",
    };
  }

  return {
    code,
    message,
  };
}
