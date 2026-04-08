"use client";

import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className="mt-50 flex h-full flex-col items-center justify-center gap-6 text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold">문제가 발생했습니다</h1>
        <p className="mt-2 text-gray-400">잠시 후 다시 시도해주세요.</p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <button
          onClick={() => reset()}
          className="rounded bg-yellow-400 px-4 py-2 text-black"
        >
          다시 시도
        </button>

        <button
          onClick={() => router.push("/")}
          className="rounded border border-gray-500 px-4 py-2"
        >
          홈으로 이동
        </button>
      </div>
    </div>
  );
}
