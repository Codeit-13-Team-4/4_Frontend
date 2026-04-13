interface SignupErrorDetailsOptions {
  fallbackMessage: string;
}

const SIGNUP_ERROR_MESSAGE_BY_IDENTIFIER: Record<string, string> = {
  social_account_exists:
    "해당 이메일은 다른 소셜 계정으로 가입되어 있습니다. 해당 소셜 계정으로 로그인해주세요.",
  social_email_exists:
    "이미 가입된 이메일입니다. 기존 계정으로 로그인해주세요.",
  email_exists: "이미 가입된 이메일입니다. 기존 계정으로 로그인해주세요.",
  duplicate_email: "이미 가입된 이메일입니다. 기존 계정으로 로그인해주세요.",
};

const SOCIAL_PROVIDER_LABEL_BY_TYPE: Record<string, string> = {
  kakao: "카카오",
  google: "구글",
  github: "깃허브",
};

function parseSignupError(rawMessage?: string | null) {
  const trimmedMessage = rawMessage?.trim();

  if (!trimmedMessage) {
    return null;
  }

  const [identifierPart, ...detailParts] = trimmedMessage
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (!identifierPart || !/^[a-z0-9_]+$/.test(identifierPart)) {
    return null;
  }

  const details = detailParts.reduce<Record<string, string>>((acc, part) => {
    const [key, ...valueParts] = part.split("=");
    const value = valueParts.join("=").trim();

    if (!key || !value) {
      return acc;
    }

    acc[key.trim()] = value;
    return acc;
  }, {});

  return {
    identifier: identifierPart,
    details,
  };
}

function getSocialAccountExistsMessage(type?: string) {
  const providerLabel = type ? SOCIAL_PROVIDER_LABEL_BY_TYPE[type] : null;

  if (providerLabel) {
    return `이미 ${providerLabel} 계정으로 가입된 이메일입니다. ${providerLabel} 로그인으로 이용해주세요.`;
  }

  return "이미 다른 소셜 계정으로 가입된 이메일입니다. 해당 소셜 로그인으로 이용해주세요.";
}

export function getDuplicateEmailErrorMessage(error: unknown) {
  if (error instanceof Error && "status" in error && error.status === 404) {
    return "이미 가입된 이메일입니다. 기존 계정으로 로그인해주세요.";
  }

  return null;
}

export function getSignupErrorMessage(
  status: number,
  rawMessage: string | null | undefined,
  options: SignupErrorDetailsOptions,
) {
  if (status === 404) {
    return "이미 가입된 이메일입니다. 기존 계정으로 로그인해주세요.";
  }

  const parsedError = parseSignupError(rawMessage);
  const identifier = parsedError?.identifier;

  if (identifier && SIGNUP_ERROR_MESSAGE_BY_IDENTIFIER[identifier]) {
    return SIGNUP_ERROR_MESSAGE_BY_IDENTIFIER[identifier];
  }

  if (identifier === "already_account_exists") {
    return getSocialAccountExistsMessage(parsedError?.details.type);
  }

  const message = rawMessage?.trim();

  if (!message) {
    return options.fallbackMessage;
  }

  const loweredMessage = message.toLowerCase();

  if (
    loweredMessage.includes("position should not be null") ||
    loweredMessage.includes("position must be one of")
  ) {
    return "포지션을 선택해주세요.";
  }

  return message;
}
