"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/Button/Button";
import { TypingText } from "@/widgets/landing/ui";

export function SixthSection() {
  const router = useRouter();
  function handleClickStart() {
    router.push("/login");
  }

  return (
    <section className="flex h-134.5 flex-col items-center justify-center bg-[radial-gradient(200%_160%_at_50%_0%,rgba(0,215,160,0.5)_0%,rgba(10,55,74,0.6)_50%,rgba(7,21,48,0.95)_70%,#0f172a_100%)] pb-20">
      <div className="flex flex-col items-center">
        <TypingText
          text="Ready to level up?"
          speed={100}
          className="text-xl font-bold tracking-[-0.02em] text-gray-200 md:text-4xl"
          cursorClassName="bg-gray-700"
        />

        <Button
          size="lg"
          onClick={handleClickStart}
          variant="primary"
          className="mt-10 w-60"
        >
          DevUp 시작하기
        </Button>
      </div>
    </section>
  );
}
