import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const queryString = searchParams.toString();

  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const response = await fetch(`${BASE_URL}/challenges?${queryString}`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  });
  const data = await response.json();
  if (!response.ok) {
    return NextResponse.json(
      { message: data.message },
      { status: response.status },
    );
  }
  return NextResponse.json(data, { status: 200 });
}
