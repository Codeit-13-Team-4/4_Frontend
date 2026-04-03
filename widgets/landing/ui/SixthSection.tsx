"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/Button/Button";
import TypingText from "@/widgets/landing/ui/TypingText";

export default function SixthSection() {
  const router = useRouter();
  function handleClickStart() {
    router.push("/login");
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#071530] px-5 py-20 md:px-10 md:py-24 lg:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(25,216,182,0.95)_0%,rgba(20,201,170,0.72)_30%,rgba(10,55,74,0.42)_58%,rgba(7,21,48,0.96)_84%,rgba(7,21,48,1)_100%)]" />

      <div className="relative mx-auto flex w-full max-w-360 flex-col items-center text-center">
        <TypingText
          text="Ready to level up?"
          speed={100}
          className="text-xl font-bold tracking-[-0.02em] text-white md:text-4xl"
          cursorClassName="bg-[#334155]"
        />

        <Button
          size="lg"
          onClick={handleClickStart}
          variant="primary"
          className="mt-10 rounded-2xl"
        >
          DevUp 시작하기
        </Button>
      </div>
    </section>
  );
}
