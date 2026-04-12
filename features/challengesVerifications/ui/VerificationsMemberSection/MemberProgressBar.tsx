import { AvatarIcon } from "@/shared/icons";
import { Progress } from "@/shared/ui";
import { VerificationMember } from "../../model";

export function MemberProgressBar({ data }: { data: VerificationMember }) {
  const { user } = data;
  // 수정: 현재 멤버 목록 데이터에 진행도가없음
  return (
    <div className="flex w-full items-center">
      <div className="mr-7 flex items-center gap-2">
        <AvatarIcon className="text-gray-800" width={40} height={40} />
        <span className="text-nowrap">{user.nickname}</span>
      </div>

      <div className="mr-5 flex w-full items-center gap-3">
        <Progress value={10} max={30} />

        <span className="text-nowrap text-gray-600">
          <span className="text-mint-500">30</span>%
        </span>
      </div>
      <span className="text-nowrap">인증 전</span>
    </div>
  );
}
