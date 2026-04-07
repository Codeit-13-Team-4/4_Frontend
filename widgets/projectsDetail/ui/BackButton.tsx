"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "@/shared/icons";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="이전 페이지로"
      className="flex items-center justify-center transition-opacity hover:cursor-pointer hover:opacity-70"
    >
      <ArrowLeft width={32} height={32} className="text-gray-200" />
    </button>
  );
}
