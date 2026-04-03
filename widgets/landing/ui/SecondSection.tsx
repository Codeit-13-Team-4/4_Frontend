import Image from "next/image";

export default function SecondSection() {
  return (
    <section className="relative overflow-hidden px-5 py-20 text-white md:px-10 md:py-28 lg:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,215,160,0.08),transparent_45%)]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <div className="flex max-w-180 flex-col items-center gap-7 text-center">
          <p className="text-mint-500 text-lg font-semibold">
            {"// CHALLENGE"}
          </p>

          <h2 className="text-2xl leading-tight font-bold md:text-5xl">
            매일의 기록이 모여
            <br />
            나만의 단단한 루틴으로
          </h2>

          <p className="text-base leading-8 text-gray-400 md:text-xl">
            서로 인증하고 공유하며 끝까지 완주하세요.
            <br />
            작은 습관이 모여 실력이 됩니다.
          </p>
        </div>

        <div className="relative mt-16 flex w-full justify-center md:mt-20">
          <div className="relative hidden lg:block">
            <div className="relative h-150 w-275 overflow-hidden rounded-[40px]">
              <Image
                src="/landing/section-02-pc.svg"
                alt="DevUp 데스크톱 화면"
                fill
              />
            </div>

            <div className="absolute top-[33%] left-[-4%] flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 text-4xl backdrop-blur-md">
              👏
            </div>

            <div className="absolute top-[66%] left-[2%] rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-lg text-white/90 backdrop-blur-md">
              오늘 하루도 알차게 보내셨네요 멋져요!
            </div>

            <div className="absolute top-[10%] right-[-4%] flex h-20 w-20 items-center justify-center rounded-full border border-white/30 bg-white/10 text-4xl backdrop-blur-md">
              👍
            </div>

            <div className="absolute top-[43%] right-[-6%] rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-lg text-white/90 backdrop-blur-md">
              같이 으쌰으쌰할 수 있어서 너무 좋아요~
            </div>
          </div>

          <div className="relative hidden md:block lg:hidden">
            <div className="bg-mint-500/20 absolute inset-x-[10%] bottom-[8%] h-24 rounded-full blur-3xl" />

            <div className="relative h-105 w-162.5 overflow-hidden rounded-[23px] border border-white/10 bg-[#07142D]">
              <Image
                src="/landing/section-02-pc.svg"
                alt="DevUp 태블릿 화면"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute top-[31%] left-[-6%] flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 text-3xl backdrop-blur-md">
              👏
            </div>

            <div className="absolute top-[72%] left-[1%] rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm text-white/90 backdrop-blur-md">
              오늘 하루도 알차게 보내셨네요 멋져요!
            </div>

            <div className="absolute top-[12%] right-[-6%] flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 text-3xl backdrop-blur-md">
              👍
            </div>

            <div className="absolute top-[40%] right-[-10%] max-w-[320px] rounded-full border border-white/30 bg-white/10 px-5 py-3 text-sm leading-tight text-white/90 backdrop-blur-md">
              같이 으쌰으쌰할 수 있어서 너무 좋아요~
            </div>
          </div>

          <div className="relative md:hidden">
            <div className="bg-mint-500/20 absolute inset-x-[10%] bottom-[8%] h-22 rounded-full blur-3xl" />

            <div className="relative h-135 w-62.5 overflow-hidden rounded-2xl border border-white/10 bg-[#07142D]">
              <Image
                src="/landing/section-02-mobile.svg"
                alt="DevUp 모바일 화면"
                fill
                className="object-cover"
              />
            </div>

            <div className="absolute top-[18%] -left-[14%] flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-2xl backdrop-blur-md">
              👏
            </div>

            <div className="absolute top-[35%] -right-[10%] flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-2xl backdrop-blur-md">
              👍
            </div>

            <div className="absolute top-[-8%] left-1/2 -translate-x-1/2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] leading-tight whitespace-nowrap text-white/90 backdrop-blur-md">
              같이 으쌰으쌰할 수 있어서 너무 좋아요~
            </div>

            <div className="absolute top-[60%] left-[-2%] rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[11px] leading-tight text-white/90 backdrop-blur-md">
              오늘 하루도 알차게 보내셨네요 멋져요!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
