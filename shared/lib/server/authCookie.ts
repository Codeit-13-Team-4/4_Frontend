function resolveCookieMaxAge(expiresIn?: number | null) {
  if (typeof expiresIn !== "number" || !Number.isFinite(expiresIn)) {
    return null;
  }

  const normalizedMaxAge = Math.floor(expiresIn);

  if (normalizedMaxAge <= 0) {
    return null;
  }

  return normalizedMaxAge;
}

export function getAuthCookieOptions(expiresIn?: number | null) {
  const maxAge = resolveCookieMaxAge(expiresIn);

  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/" as const,
    ...(maxAge !== null ? { maxAge } : {}),
  };
}
