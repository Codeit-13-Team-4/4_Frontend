function getJwtPayload(token: string) {
  const payload = token.split(".")[1];

  if (!payload) {
    return null;
  }

  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      exp?: number;
    };
  } catch {
    return null;
  }
}

export function getAuthCookieOptions(token: string) {
  const payload = getJwtPayload(token);
  const now = Math.floor(Date.now() / 1000);
  const maxAge =
    typeof payload?.exp === "number" ? Math.max(payload.exp - now, 0) : null;

  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/" as const,
    ...(maxAge !== null ? { maxAge } : {}),
  };
}
