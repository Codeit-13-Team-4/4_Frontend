import { cn } from "@/shared/utils";
import { VerificationsTabType } from "./VerificationsListSection";
import { Dispatch, SetStateAction } from "react";

const VERIFICATIONS_TAB_ITEMS: {
  value: VerificationsTabType;
  label: string;
}[] = [
  {
    value: "PENDING",
    label: "인증전",
  },
  {
    value: "REJECTED",
    label: "인증완료",
  },
  {
    value: "COMPLETED",
    label: "거절",
  },
];

export function VerificationsStatusTab({
  status,
  onStatusChange,
}: {
  status: VerificationsTabType;
  onStatusChange: Dispatch<SetStateAction<VerificationsTabType>>;
}) {
  return (
    <div className="mb-7 flex justify-center gap-1 rounded-full bg-gray-800 px-2.5 py-2 sm:w-fit sm:justify-start">
      {VERIFICATIONS_TAB_ITEMS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onStatusChange(tab.value)}
          className={cn(
            "flex-1 cursor-pointer rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap text-gray-50 transition-colors duration-200 sm:flex-none",
            status === tab.value
              ? "bg-mint-500 border-mint-500"
              : "border-none bg-transparent",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
