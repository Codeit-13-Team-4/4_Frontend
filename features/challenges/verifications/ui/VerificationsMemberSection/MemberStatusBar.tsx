import { AvatarIcon, Check, XIcon } from "@/shared/icons";
import { VerificationMember, VerificationStatus } from "../../model";
import Image from "next/image";

export function MemberStatusBar({
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

  return (
    <div className="flex w-full items-center justify-between">
      <div className="mr-7 flex items-center gap-2">
        {user.profileImageUrl ? (
          <Image
            src={user.profileImageUrl}
            alt="멤버 프로필 이미지"
            width={40}
            height={40}
            className="h-full w-full rounded-full"
            priority
          />
        ) : (
          <AvatarIcon className="text-gray-800" width={40} height={40} />
        )}

        <span className="text-nowrap">{user.nickname}</span>
      </div>

      <span className="text-nowrap">
        {verificationLabel[verificationStatus]}
      </span>
    </div>
  );
}
