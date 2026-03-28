"use client";

import { Dropdown } from "@/shared/ui";
import { useState } from "react";
import Image from "next/image";

const FILTER_LABEL = {
  latest: "최신순",
  popular: "인기순",
  closingSoon: "마감 임박순",
  oldest: "오래된 순",
} as const;

type FilterType = keyof typeof FILTER_LABEL;

export function ProjectSortDropdown() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<FilterType>("latest");
  return (
    <Dropdown open={open} onOpenChange={setOpen}>
      <Dropdown.Trigger>
        <button className="group flex items-center gap-1 text-[#94A3B8]">
          {FILTER_LABEL[filter]}
          <Image
            src="/icons/common/chevron_down_sm-icon.svg"
            width={17}
            height={17}
            alt=""
            aria-hidden="true"
            className="group-data-open:hidden"
          />
          <Image
            src="/icons/common/chevron_up_sm-icon.svg"
            width={17}
            height={17}
            alt=""
            aria-hidden="true"
            className="hidden group-data-open:block"
          />
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content className="border border-gray-700 bg-gray-900">
        <Dropdown.RadioGroup
          value={filter}
          onValueChange={(value) => setFilter(value as FilterType)}
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
            value="closingSoon"
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
