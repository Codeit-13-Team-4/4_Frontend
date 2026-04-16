import { AvatarIcon, Check, XIcon } from "@/shared/icons";
import { MemberStatusBarProps } from "../../model";
import Image from "next/image";
import { Progress } from "@/shared/ui";

export function MemberStatusBar({ data }: { data: MemberStatusBarProps }) {
  const verificationLabel = {
    APPROVED: <Check className="text-mint-500" width={20} height={20} />,
    PENDING: "대기중",
    REJECTED: <XIcon className="text-error" width={14} height={14} />,
  };

  return (
    <div className="flex w-full flex-col md:flex-row md:items-center">
      <div className="flex w-20 min-w-50 items-center gap-2">
        {data.profileImageUrl ? (
          <Image
            src={data.profileImageUrl}
            alt="멤버 프로필 이미지"
            width={40}
            height={40}
            className="h-6 w-6 rounded-full md:h-11 md:w-11"
            priority
          />
        ) : (
          <AvatarIcon className="text-gray-800" width={40} height={40} />
        )}

        <div className="text-[14px] text-nowrap md:text-base">
          {data.nickname}
        </div>
      </div>
      <div className="mx-0 flex flex-1 items-center gap-3 md:mx-3">
        <Progress
          value={data.progressPercentage}
          max={100}
          className="flex flex-1"
        />
        <span className="text-nowrap text-gray-600">
          <span className="text-mint-500 text-[18px]">
            {Math.round(data.progressPercentage)}
          </span>
          %
        </span>
      </div>

      <div className="hidden text-[14px] text-nowrap md:block md:text-base">
        {verificationLabel[data.todayVerificationStatus] ?? "인증 전"}
      </div>
    </div>
  );
}
