"use client";
import { useState } from "react";
import { VerificationsStatusTab } from "./VerificationsStatusTab";
import { VerificationsCardList } from "./VerificationsCardList";

export type VerificationsTabType = "PENDING" | "APPROVED" | "REJECTED";

export function VerificationsListSection({ isHost }: { isHost: boolean }) {
  const [status, setStatus] = useState<VerificationsTabType>("PENDING");
  const [pendingCount, setPendingCount] = useState<number>(0);

  return (
    <div>
      <h3 className="mt-11 mb-7 text-[20px] text-gray-50 md:text-[24px]">
        {isHost ? "멤버 활동 내역" : "실시간 인증 현황"}
      </h3>

      {isHost && (
        <VerificationsStatusTab
          status={status}
          onStatusChange={setStatus}
          count={pendingCount}
        />
      )}

      <VerificationsCardList
        status={status}
        isHost={isHost}
        setPendingCount={setPendingCount}
      />
    </div>
  );
}
