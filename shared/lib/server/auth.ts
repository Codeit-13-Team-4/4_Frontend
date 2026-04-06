import { cookies } from "next/headers";
import { ApiError } from "@/shared/lib/errors/ApiError";
import { getErrorMessage } from "@/shared/lib/errors/errorMessage";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const ACCESS_TOKEN_MAX_AGE = 60 * 15;
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7;

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
  message?: string;
}

type RefreshAccessTokenResult =
  | { ok: true; accessToken: string }
  | { ok: false; status: number; message: string };

async function refreshAccessToken(): Promise<RefreshAccessTokenResult> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return { ok: false, status: 401, message: "리프레시 토큰이 없습니다." };
  }

  const response = await fetch(`${BASE_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ refreshToken }),
  });

  const data = (await response
    .json()
    .catch(() => null)) as RefreshTokenResponse | null;

  if (!response.ok || !data?.accessToken) {
    return {
      ok: false,
      status: response.status,
      message: data?.message ?? "토큰 재발급에 실패했습니다.",
    };
  }

  cookieStore.set("accessToken", data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });

  if (data.refreshToken) {
    cookieStore.set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });
  }

  return { ok: true, accessToken: data.accessToken };
}

export async function fetchWithAuthRetry<T>(
  url: string,
  options?: RequestInit,
): Promise<T> {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    const refreshResult = await refreshAccessToken();

    if (!refreshResult.ok) {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      throw new ApiError(refreshResult.status, refreshResult.message);
    }

    accessToken = refreshResult.accessToken;
  }

  let response = await fetch(url, {
    ...options,
    headers: {
      ...(options?.headers ?? {}),
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (response.status === 401) {
    const refreshResult = await refreshAccessToken();

    if (!refreshResult.ok) {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      throw new ApiError(refreshResult.status, refreshResult.message);
    }

    response = await fetch(url, {
      ...options,
      headers: {
        ...(options?.headers ?? {}),
        Authorization: `Bearer ${refreshResult.accessToken}`,
      },
      cache: "no-store",
    });
  }

  const data = (await response.json().catch(() => null)) as
    | (T & { message?: string })
    | null;

  if (!response.ok) {
    throw new ApiError(
      response.status,
      getErrorMessage(response.status, data?.message),
    );
  }

  return data as T;
}
