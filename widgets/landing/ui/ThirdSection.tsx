import {
  PortfolioIcon,
  ContestIcon,
  HackathonIcon,
  StartupIcon,
} from "@/widgets/landing/ui";

export function ThirdSection() {
  return (
    <section className="bg-gray-900 px-5 py-20 md:px-10 md:py-28 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mx-auto flex max-w-170 flex-col gap-7 text-center">
          <p className="text-mint-500 text-lg font-semibold">{"// PROJECT"}</p>

          <h2 className="text-2xl leading-tight font-bold md:text-5xl">
            내 포지션에 딱 맞는
            <br />
            실전 프로젝트 탐색
          </h2>

          <p className="text-base leading-8 text-gray-400 md:text-xl">
            목적과 포지션에 맞춰 팀원을 찾거나 합류하세요.
            <br />
            실무와 가장 가까운 협업 경험을 제공합니다.
          </p>
        </div>

        <div className="mt-30 grid grid-cols-2 gap-2 md:grid-cols-4">
          <PortfolioIcon className="text-mint-900 hover:text-mint-500 w-full max-w-78" />
          <ContestIcon className="text-mint-900 hover:text-mint-500 w-full max-w-78" />
          <HackathonIcon className="text-mint-900 hover:text-mint-500 w-full max-w-78" />
          <StartupIcon className="text-mint-900 hover:text-mint-500 w-full max-w-78" />
        </div>
      </div>
    </section>
  );
}
