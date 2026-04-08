"use client";

import { cn } from "@/shared/utils";

interface MyStatusFilterProps {
  status: string;
  onStatusChange: (status: string) => void;
  filters: readonly { readonly value: string; readonly label: string }[];
}

export default function MyStatusFilter({
  status,
  onStatusChange,
  filters,
}: MyStatusFilterProps) {
  return (
    <div className="flex w-fit gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onStatusChange(filter.value)}
          className={cn(
            "cursor-pointer rounded-3xl border px-2 py-1 text-sm font-normal transition-colors duration-200 sm:px-3 sm:py-2 sm:text-base",
            status === filter.value
              ? "border-mint-500 text-mint-500 bg-gray-900"
              : "border-gray-900 bg-gray-800 text-gray-400",
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
