import { ChallengeIcon, Folder } from "@/shared/icons";
import { User } from "@/shared/types/user";

type ProfileStatsProps = {
  stats: User["stats"];
};

export default function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <ul className="flex flex-row gap-1 text-sm font-normal text-gray-400 md:flex-col">
      <li className="flex items-center gap-1.5 rounded-lg border border-gray-700 px-2 py-1.5">
        <ChallengeIcon width={16} height={16} className="text-gray-400" />
        <span>챌린지</span>
        <span className="text-mint-500 ml-auto text-sm font-semibold">
          {stats.challengeCount}
        </span>
      </li>
      <li className="flex items-center gap-1.5 rounded-lg border border-gray-700 px-2 py-1.5">
        <Folder width={16} height={16} />
        <span>프로젝트</span>
        <span className="text-mint-500 ml-auto text-sm font-semibold">
          {stats.projectCount}
        </span>
      </li>
    </ul>
  );
}
