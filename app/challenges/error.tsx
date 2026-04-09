"use client";

import { Button, GradientButton } from "@/shared/ui";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Error({ reset }: { reset: () => void }) {
  const router = useRouter();

  return (
    <div className="mt-50 flex h-full flex-col items-center justify-center gap-6 text-white">
      <div className="flex flex-col items-center">
        <Image
          src="/images/img_server_error.png"
          width={120}
          height={100}
          alt="서버 에러"
        />
        <p className="mt-2 text-center text-gray-50">
          서버가 잠시 디버깅 중이에요. <br />
          잠시 후 다시 시도해주세요.
        </p>
      </div>

      <div className="flex w-80 flex-col gap-3 md:w-100 md:flex-row">
        <GradientButton onClick={() => reset()} className="w-full">
          다시 시도
        </GradientButton>

        <Button
          variant="primary"
          onClick={() => router.push("/")}
          className="w-full"
        >
          메인으로 이동
        </Button>
      </div>
    </div>
  );
}
