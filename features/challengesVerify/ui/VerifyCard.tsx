import { AvatarIcon } from "@/shared/icons";
export default function VerifyCard() {
  return (
    <div className="flex h-150 w-100 flex-col gap-10 rounded-[20px] border border-gray-700 bg-gray-800 px-5 pt-10 pb-5">
      <div className="flex items-center justify-center gap-1.5">
        <div className="h-11 w-11 bg-gray-700">
          <AvatarIcon className="text-gray-800" width={44} height={44} />
        </div>

        <div className="flex flex-col">
          <span className="text-gray-400">닉네임</span>
          <span className="text-gray-600">1분 전</span>
        </div>
      </div>
      <div className="flex-1 rounded-[40px] bg-gray-700"></div>
      <div>여기각 내용임 두줄넘어가면 더보기해달래요</div>
    </div>
  );
}
