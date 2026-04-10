"use client";
import { useState } from "react";
import VerificationsCard from "./VerificationsCard";
import { VerificationsStatusTab } from "./VerificationsStatusTab";
import { VerificationsSkeletonCard } from "./VerificationsSkeletonCard";

export type VerificationsTabType = "PENDING" | "REJECTED" | "COMPLETED";

const isHost = true;
export function VerificationsListSection() {
  const [status, setStatus] = useState<VerificationsTabType>("PENDING");

  return (
    <div>
      <h3 className="mt-11 mb-7 text-[24px] text-gray-50">
        {isHost ? "멤버 활동 내역" : "실시간 인증 현황"}
      </h3>

      {isHost && (
        <VerificationsStatusTab status={status} onStatusChange={setStatus} />
      )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <VerificationsCard />
        <VerificationsCard />
        <VerificationsCard />
        <VerificationsSkeletonCard />
      </div>
    </div>
  );
}
