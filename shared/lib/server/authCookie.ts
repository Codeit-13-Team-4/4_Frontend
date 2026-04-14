export function getAuthCookieOptions(maxAge: number | null = 900) {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/" as const,
    ...(typeof maxAge === "number" && Number.isFinite(maxAge) && maxAge > 0
      ? { maxAge }
      : {}),
  };
}
