import { User } from "@/shared/types/user";

type ProfileStatsProps = {
  stats: User["stats"];
};

export default function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <ul className="flex max-w-27 flex-row gap-1 text-sm font-normal text-gray-400 sm:flex-col">
      <li className="flex items-center gap-1.5 rounded-lg border border-gray-700 px-2 py-1.5">
        {/* <Image src="/icons/common/..." alt="" width={16} height={16} /> */}
        <span>챌린지</span>
        <span className="text-mint-500 ml-auto text-sm font-semibold">
          {stats.challengeCount}
        </span>
      </li>
      <li className="flex items-center gap-1.5 rounded-lg border border-gray-700 px-2 py-1.5">
        {/* <Image src="/icons/common/..." alt="" width={16} height={16} /> */}
        <span>프로젝트</span>
        <span className="text-mint-500 ml-auto text-sm font-semibold">
          {stats.projectCount}
        </span>
      </li>
    </ul>
  );
}
