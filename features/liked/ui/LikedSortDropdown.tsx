"use client";

import { Dropdown } from "@/shared/ui";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDownIcon, ChevronUpIcon } from "@/shared/icons";
import { parseLikedSort } from "@/features/liked/lib/likedSearchParams";
import type { LikedSortType } from "../model";

const LIKED_SORT_LABEL: Record<LikedSortType, string> = {
  latest: "최신순",
  popular: "인기순",
  deadline: "마감 임박순",
  oldest: "오래된 순",
};

export function LikedSortDropdown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = parseLikedSort(searchParams.get("sort")) ?? "latest";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "latest") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }
    params.delete("order");

    const queryString = params.toString();
    router.push(queryString ? `/liked?${queryString}` : "/liked");
  };

  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      <Dropdown.Trigger>
        <button className="group flex items-center gap-1 text-[#94A3B8]">
          {LIKED_SORT_LABEL[currentSort]}
          <ChevronDownIcon
            width={17}
            height={17}
            className="group-data-open:hidden"
          />
          <ChevronUpIcon
            width={17}
            height={17}
            className="hidden group-data-open:block"
          />
        </button>
      </Dropdown.Trigger>

      <Dropdown.Content className="border border-gray-700 bg-gray-900">
        <Dropdown.RadioGroup
          value={currentSort}
          onValueChange={handleChange}
          className="flex flex-col gap-1 text-center"
        >
          <Dropdown.RadioItem
            value="latest"
            className="text-sm text-[#E2EBF0] hover:bg-[#494c53]"
          >
            최신순
          </Dropdown.RadioItem>
          <Dropdown.Separator />
          <Dropdown.RadioItem
            value="popular"
            className="text-sm text-[#E2EBF0] hover:bg-[#494c53]"
          >
            인기순
          </Dropdown.RadioItem>
          <Dropdown.Separator />
          <Dropdown.RadioItem
            value="deadline"
            className="text-sm text-[#E2EBF0] hover:bg-[#494c53]"
          >
            마감 임박순
          </Dropdown.RadioItem>
          <Dropdown.Separator />
          <Dropdown.RadioItem
            value="oldest"
            className="text-sm text-[#E2EBF0] hover:bg-[#494c53]"
          >
            오래된 순
          </Dropdown.RadioItem>
        </Dropdown.RadioGroup>
      </Dropdown.Content>
    </Dropdown>
  );
}
