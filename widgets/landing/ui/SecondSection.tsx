export default function SecondSection() {
  return (
    <section className="relative overflow-hidden px-5 py-20 text-white md:px-10 md:py-28 lg:px-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,215,160,0.08),transparent_45%)]" />

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        <div className="flex max-w-[720px] flex-col items-center gap-7 text-center">
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
      </div>
    </section>
  );
}
