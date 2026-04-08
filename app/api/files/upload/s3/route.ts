import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const url = formData.get("url") as string;

    formData.delete("url");

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { message: text || "S3 업로드에 실패했습니다." },
        { status: response.status },
      );
    }

    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
