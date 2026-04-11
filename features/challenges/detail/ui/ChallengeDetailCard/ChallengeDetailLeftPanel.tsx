import type { ChallengesDetail } from "@/features/challenges/detail/model/challengesDetail";
import { ScrollArea } from "@/shared/ui/ScrollArea/ScrollArea";

interface ChallengeDetailLeftPanelProps {
  challenge: ChallengesDetail;
}

export default function ChallengeDetailLeftPanel({
  challenge,
}: ChallengeDetailLeftPanelProps) {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-600 lg:text-lg">
          챌린지 소개
        </p>
        <ScrollArea className="h-43 rounded-xl border border-gray-700 bg-gray-900 px-4 py-3">
          <p className="text-sm leading-relaxed text-gray-50 lg:text-base">
            {challenge.description}
          </p>
        </ScrollArea>
      </div>
    </div>
  );
}
