import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const IS_PRODUCTION = process.env.NODE_ENV === "production";

export async function POST() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (refreshToken) {
    const logoutUrl = new URL(`${BASE_URL}/auth/logout`);
    logoutUrl.searchParams.set("refreshToken", refreshToken);

    const backendResponse = await fetch(logoutUrl.toString(), {
      method: "DELETE",
      headers: {
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });

    if (!backendResponse.ok && backendResponse.status !== 204) {
      const text = await backendResponse.text();

      return NextResponse.json(
        { message: text || "백엔드 로그아웃에 실패했습니다." },
        { status: backendResponse.status },
      );
    }
  }

  const response = NextResponse.json({ message: "로그아웃 되었습니다." });

  response.cookies.set("accessToken", "", {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });

  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure: IS_PRODUCTION,
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });

  return response;
}
