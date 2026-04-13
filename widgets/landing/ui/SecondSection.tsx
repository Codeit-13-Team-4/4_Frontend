import Image from "next/image";

export function SecondSection() {
  return (
    <section className="h-230 overflow-hidden pt-20">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-10">
        <div className="flex flex-col gap-7 text-center">
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

        <div className="mx-auto mt-30 flex w-full justify-center px-4">
          <div className="relative w-full max-w-275 rounded-[40px] md:aspect-video md:shadow-[0_0_30px_5px_rgba(0,215,160,0.6)]">
            <Image
              src="images/section-02-pc.svg"
              alt="DevUp 데스크톱 화면"
              fill
              className="hidden object-contain md:block"
            />
            <div className="mt-13 flex justify-center">
              <Image
                src="images/section-02-mobile.svg"
                alt="DevUp 데스크톱 화면"
                width={250}
                height={600}
                className="block md:hidden"
              />
            </div>

            <div className="absolute top-[10%] left-[10%] md:top-[10%] md:left-[0%] lg:left-[-10%]">
              <div className="border-mint-500/50 animate-float-left flex h-17 w-17 items-center justify-center rounded-full border bg-white/10 text-4xl backdrop-blur-md md:h-20 md:w-20">
                👏
              </div>
            </div>

            <div className="absolute top-[50%] right-[10%] md:right-0 lg:top-[-15%] lg:right-[-10%]">
              <div className="relative">
                <div className="animate-float-right border-mint-500/50 flex h-20 w-20 items-center justify-center rounded-full border bg-white/10 text-4xl backdrop-blur-md [animation-delay:1s] md:h-20 md:w-20">
                  👍
                </div>
              </div>
            </div>

            <div className="border-mint-500/30 animate-float text-md absolute top-0 right-0 rounded-full border bg-gray-700/70 px-3 py-2 text-gray-200 md:px-5 md:text-lg lg:top-[20%] lg:right-[-12%]">
              같이 으쌰으쌰할 수 있어서 너무 좋아요~
            </div>
            <div className="border-mint-500/30 animate-float text-md absolute bottom-[50%] left-0 rounded-full border bg-gray-700/70 px-3 py-2 text-gray-200 [animation-delay:0.5s] md:px-5 md:text-lg lg:left-[-15%]">
              오늘 하루도 알차게 보내셨네요 멋져요!
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
