"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="이전 페이지로"
      className="flex items-center justify-center transition-opacity hover:cursor-pointer hover:opacity-70"
    >
      <Image
        src="/projectDetail/arrow-left.svg"
        alt="뒤로가기"
        width={32}
        height={32}
      />
    </button>
  );
}
