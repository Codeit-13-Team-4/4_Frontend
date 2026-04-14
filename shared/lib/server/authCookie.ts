function resolveCookieMaxAge(expiresInMs?: number | null) {
  if (typeof expiresInMs !== "number" || !Number.isFinite(expiresInMs)) {
    return null;
  }

  const normalizedMaxAge = Math.floor(expiresInMs / 1000);

  if (normalizedMaxAge <= 0) {
    return null;
  }

  return normalizedMaxAge;
}

export function getAuthCookieOptions(expiresInMs?: number | null) {
  const maxAge = resolveCookieMaxAge(expiresInMs);

  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/" as const,
    ...(maxAge !== null ? { maxAge } : {}),
  };
}
