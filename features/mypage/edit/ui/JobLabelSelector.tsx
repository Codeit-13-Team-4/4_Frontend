"use client";

import { cn } from "@/shared/utils";
import { JobLabelType } from "@/shared/types/user";
import { JOB_LABEL_MAP } from "@/features/mypage/model/mypage.constants";

interface Props {
  value: JobLabelType;
  onChange: (value: JobLabelType) => void;
}

export default function JobLabelSelector({ value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {(Object.entries(JOB_LABEL_MAP) as [JobLabelType, string][]).map(
        ([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={cn(
              "cursor-pointer rounded-3xl border px-3 py-1 text-sm font-medium transition-colors",
              value === key
                ? "border-mint-500 bg-mint-500/10 text-mint-500"
                : "border-gray-700 text-gray-400 hover:border-gray-400 hover:text-gray-200",
            )}
          >
            {label}
          </button>
        ),
      )}
    </div>
  );
}
