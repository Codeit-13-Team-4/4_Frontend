export default function LoginHero() {
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,215,160,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,215,160,0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,215,160,0.18),transparent_60%)]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="mb-8 text-5xl leading-snug font-semibold text-white">
          코딩 스킬을 넘어,
          <br />
          개발자로서의 새로운 레벨로
        </p>

        <div className="relative">
          <span className="text-8xl font-extrabold tracking-wide text-[#27e0b3] uppercase drop-shadow-[0_0_18px_rgba(39,224,179,0.85)]">
            LEVEL UP!
          </span>

          <div className="absolute inset-0 blur-md">
            <span className="text-8xl font-extrabold tracking-wide text-[#27e0b3]/40 uppercase">
              LEVEL UP!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
