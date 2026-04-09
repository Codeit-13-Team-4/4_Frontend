import VerifyCard from "./VerifyCard";

const isHost = true;
export function VerifyListSection() {
  return (
    <div>
      <h3 className="mt-11 mb-7 text-[24px] text-gray-50">
        {isHost ? "멤버 활동 내역" : "실시간 인증 현황"}
      </h3>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <VerifyCard />
        <VerifyCard />
        <VerifyCard />
      </div>
    </div>
  );
}
