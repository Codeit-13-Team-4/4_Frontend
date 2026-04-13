import { AvatarIcon, Check, XIcon } from "@/shared/icons";
import { Progress } from "@/shared/ui";
import { VerificationMember, VerificationStatus } from "../../model";

export function MemberProgressBar({
  data,
  verificationStatus,
}: {
  data: VerificationMember;
  verificationStatus: VerificationStatus;
}) {
  const { user } = data;
  const verificationLabel = {
    BEFORE: "인증 전",
    APPROVED: <Check className="text-mint-500" width={20} height={20} />,
    PENDING: "대기중",
    REJECTED: <XIcon className="text-error" width={14} height={14} />,
  };

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
      <span className="text-nowrap">
        {verificationLabel[verificationStatus]}
      </span>
    </div>
  );
}
